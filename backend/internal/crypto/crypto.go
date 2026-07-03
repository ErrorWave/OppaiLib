// Package crypto implements OppaiLib's envelope encryption.
//
// A passphrase-derived Key-Encryption-Key (KEK) wraps a random per-file
// Data-Encryption-Key (DEK). File content is encrypted with AES-256-GCM in
// fixed-size chunks; each chunk uses a fresh random nonce and binds its index
// (plus a final-chunk terminator) as AAD, which prevents reordering and
// truncation of the ciphertext stream. Small metadata fields use a single
// GCM seal with a random nonce.
package crypto

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/subtle"
	"encoding/binary"
	"errors"
	"fmt"
	"io"

	"golang.org/x/crypto/argon2"
)

const (
	KeySize   = 32               // AES-256
	nonceSize = 12               // GCM standard nonce
	ChunkSize = 64 * 1024        // 64 KiB plaintext per chunk
	magic     = "OPLB1"          // blob header magic
	version   = 1

	// Argon2id parameters for KEK derivation.
	argonTime    = 3
	argonMemory  = 64 * 1024 // KiB → 64 MiB
	argonThreads = 4
)

var (
	ErrBadMagic   = errors.New("crypto: bad blob header")
	ErrAuthFailed = errors.New("crypto: authentication failed (wrong key or corrupt data)")
)

// DeriveKEK stretches a passphrase into a 32-byte key-encryption key.
func DeriveKEK(passphrase string, salt []byte) []byte {
	return argon2.IDKey([]byte(passphrase), salt, argonTime, argonMemory, argonThreads, KeySize)
}

// RandomBytes returns n cryptographically random bytes.
func RandomBytes(n int) ([]byte, error) {
	b := make([]byte, n)
	if _, err := rand.Read(b); err != nil {
		return nil, err
	}
	return b, nil
}

func newGCM(key []byte) (cipher.AEAD, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}
	return cipher.NewGCM(block)
}

// SealBytes encrypts plaintext with key; output is nonce||ciphertext||tag.
// Used for small metadata fields. Optional aad binds associated context.
func SealBytes(key, plaintext, aad []byte) ([]byte, error) {
	gcm, err := newGCM(key)
	if err != nil {
		return nil, err
	}
	nonce, err := RandomBytes(nonceSize)
	if err != nil {
		return nil, err
	}
	return gcm.Seal(nonce, nonce, plaintext, aad), nil
}

// OpenBytes reverses SealBytes.
func OpenBytes(key, blob, aad []byte) ([]byte, error) {
	if len(blob) < nonceSize {
		return nil, ErrAuthFailed
	}
	gcm, err := newGCM(key)
	if err != nil {
		return nil, err
	}
	nonce, ct := blob[:nonceSize], blob[nonceSize:]
	pt, err := gcm.Open(nil, nonce, ct, aad)
	if err != nil {
		return nil, ErrAuthFailed
	}
	return pt, nil
}

// WrapKey encrypts a DEK under the KEK. Output: nonce||ciphertext||tag.
func WrapKey(kek, dek []byte) ([]byte, error) { return SealBytes(kek, dek, []byte("dek")) }

// UnwrapKey reverses WrapKey.
func UnwrapKey(kek, wrapped []byte) ([]byte, error) { return OpenBytes(kek, wrapped, []byte("dek")) }

// ConstantTimeEqual reports whether a and b are equal without leaking timing.
func ConstantTimeEqual(a, b []byte) bool { return subtle.ConstantTimeCompare(a, b) == 1 }

// chunkAAD binds a chunk's ordinal index and whether it is the final chunk.
func chunkAAD(index uint64, final bool) []byte {
	aad := make([]byte, 9)
	binary.BigEndian.PutUint64(aad[:8], index)
	if final {
		aad[8] = 1
	}
	return aad
}

// EncryptStream reads plaintext from src and writes an encrypted blob to dst.
//
// Blob layout:
//
//	magic[5] version[1] wrappedLen[2] wrapped[...]
//	then repeated: chunkNonce[12] chunkCTLen[4] chunkCT[...]
//	the final chunk (possibly zero-length plaintext) carries the final-flag AAD.
//
// A fresh DEK is generated and wrapped under kek; the blob is self-contained.
func EncryptStream(dst io.Writer, src io.Reader, kek []byte) error {
	dek, err := RandomBytes(KeySize)
	if err != nil {
		return err
	}
	wrapped, err := WrapKey(kek, dek)
	if err != nil {
		return err
	}
	gcm, err := newGCM(dek)
	if err != nil {
		return err
	}

	// Header.
	if _, err := io.WriteString(dst, magic); err != nil {
		return err
	}
	if _, err := dst.Write([]byte{version}); err != nil {
		return err
	}
	var lenBuf [4]byte
	binary.BigEndian.PutUint16(lenBuf[:2], uint16(len(wrapped)))
	if _, err := dst.Write(lenBuf[:2]); err != nil {
		return err
	}
	if _, err := dst.Write(wrapped); err != nil {
		return err
	}

	buf := make([]byte, ChunkSize)
	var index uint64
	for {
		n, readErr := io.ReadFull(src, buf)
		final := readErr == io.EOF || readErr == io.ErrUnexpectedEOF
		if readErr != nil && !final {
			return readErr
		}
		if err := writeChunk(dst, gcm, buf[:n], index, final); err != nil {
			return err
		}
		index++
		if final {
			return nil
		}
	}
}

func writeChunk(dst io.Writer, gcm cipher.AEAD, plain []byte, index uint64, final bool) error {
	nonce, err := RandomBytes(nonceSize)
	if err != nil {
		return err
	}
	ct := gcm.Seal(nil, nonce, plain, chunkAAD(index, final))
	if _, err := dst.Write(nonce); err != nil {
		return err
	}
	var lb [4]byte
	binary.BigEndian.PutUint32(lb[:], uint32(len(ct)))
	if _, err := dst.Write(lb[:]); err != nil {
		return err
	}
	_, err = dst.Write(ct)
	return err
}

// DecryptStream reads an encrypted blob from src and writes plaintext to dst.
func DecryptStream(dst io.Writer, src io.Reader, kek []byte) error {
	dek, gcm, err := readHeader(src, kek)
	if err != nil {
		return err
	}
	_ = dek

	var index uint64
	nonce := make([]byte, nonceSize)
	var lb [4]byte
	for {
		if _, err := io.ReadFull(src, nonce); err != nil {
			if err == io.EOF {
				// Stream ended without a final-flagged chunk → truncated.
				return ErrAuthFailed
			}
			return err
		}
		if _, err := io.ReadFull(src, lb[:]); err != nil {
			return err
		}
		ct := make([]byte, binary.BigEndian.Uint32(lb[:]))
		if _, err := io.ReadFull(src, ct); err != nil {
			return err
		}
		// Try non-final first, then final. Exactly one AAD authenticates.
		plain, err := gcm.Open(nil, nonce, ct, chunkAAD(index, false))
		if err != nil {
			plain, err = gcm.Open(nil, nonce, ct, chunkAAD(index, true))
			if err != nil {
				return ErrAuthFailed
			}
			// Final chunk: write remainder and stop.
			if _, err := dst.Write(plain); err != nil {
				return err
			}
			return nil
		}
		if _, err := dst.Write(plain); err != nil {
			return err
		}
		index++
	}
}

func readHeader(src io.Reader, kek []byte) ([]byte, cipher.AEAD, error) {
	hdr := make([]byte, len(magic)+1)
	if _, err := io.ReadFull(src, hdr); err != nil {
		return nil, nil, err
	}
	if string(hdr[:len(magic)]) != magic {
		return nil, nil, ErrBadMagic
	}
	if hdr[len(magic)] != version {
		return nil, nil, fmt.Errorf("crypto: unsupported blob version %d", hdr[len(magic)])
	}
	var lb [2]byte
	if _, err := io.ReadFull(src, lb[:]); err != nil {
		return nil, nil, err
	}
	wrapped := make([]byte, binary.BigEndian.Uint16(lb[:]))
	if _, err := io.ReadFull(src, wrapped); err != nil {
		return nil, nil, err
	}
	dek, err := UnwrapKey(kek, wrapped)
	if err != nil {
		return nil, nil, err
	}
	gcm, err := newGCM(dek)
	if err != nil {
		return nil, nil, err
	}
	return dek, gcm, nil
}
