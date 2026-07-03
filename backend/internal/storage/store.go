// Package storage implements the encrypted, content-addressed blob store.
//
// Files are sharded by the first two hex chars of their SHA-256 and written as
// envelope-encrypted blobs (see crypto.EncryptStream). The plaintext is never
// written to disk; hashing happens on the incoming stream before encryption.
package storage

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/youruser/oppailib/internal/crypto"
)

type Store struct {
	root string
	kek  []byte
}

func New(root string, kek []byte) (*Store, error) {
	if err := os.MkdirAll(root, 0o700); err != nil {
		return nil, err
	}
	return &Store{root: root, kek: kek}, nil
}

// PutResult describes a stored blob.
type PutResult struct {
	SHA256   string
	Size     int64
	RelPath  string
	Existed  bool
}

// countingReader tallies bytes and hashes as data flows through.
type countingReader struct {
	r    io.Reader
	n    int64
	hash io.Writer
}

func (c *countingReader) Read(p []byte) (int, error) {
	n, err := c.r.Read(p)
	if n > 0 {
		c.n += int64(n)
		c.hash.Write(p[:n])
	}
	return n, err
}

// Put encrypts src into the store. Because the content hash is only known after
// reading the whole stream, we encrypt to a temp file, then rename into the
// hash-derived final path. If a blob with the same hash already exists, the temp
// is discarded and Existed=true is returned (dedup).
func (s *Store) Put(src io.Reader) (*PutResult, error) {
	tmp, err := os.CreateTemp(s.root, ".ingest-*")
	if err != nil {
		return nil, err
	}
	tmpPath := tmp.Name()
	defer func() {
		tmp.Close()
		os.Remove(tmpPath) // no-op if already renamed away
	}()

	h := sha256.New()
	cr := &countingReader{r: src, hash: h}
	if err := crypto.EncryptStream(tmp, cr, s.kek); err != nil {
		return nil, err
	}
	if err := tmp.Sync(); err != nil {
		return nil, err
	}
	if err := tmp.Close(); err != nil {
		return nil, err
	}

	sum := hex.EncodeToString(h.Sum(nil))
	rel := shardPath(sum)
	final := filepath.Join(s.root, rel)

	if _, err := os.Stat(final); err == nil {
		return &PutResult{SHA256: sum, Size: cr.n, RelPath: rel, Existed: true}, nil
	}
	if err := os.MkdirAll(filepath.Dir(final), 0o700); err != nil {
		return nil, err
	}
	if err := os.Rename(tmpPath, final); err != nil {
		return nil, err
	}
	return &PutResult{SHA256: sum, Size: cr.n, RelPath: rel}, nil
}

// Open returns a reader that decrypts the blob on the fly. Callers must Close it.
func (s *Store) Open(rel string) (io.ReadCloser, error) {
	f, err := os.Open(filepath.Join(s.root, rel))
	if err != nil {
		return nil, err
	}
	pr, pw := io.Pipe()
	go func() {
		err := crypto.DecryptStream(pw, f, s.kek)
		f.Close()
		pw.CloseWithError(err)
	}()
	return pr, nil
}

// Delete removes a blob.
func (s *Store) Delete(rel string) error {
	err := os.Remove(filepath.Join(s.root, rel))
	if os.IsNotExist(err) {
		return nil
	}
	return err
}

func shardPath(sum string) string {
	if len(sum) < 4 {
		return sum
	}
	return fmt.Sprintf("%s/%s/%s", sum[0:2], sum[2:4], sum)
}
