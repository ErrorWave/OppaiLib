package api

import (
	"context"
	"sync"
	"time"
)

// resolveCache memoizes an expensive resolution against a remote source — a comic's
// page list, a thread's comments — with a TTL and single-flight.
//
// Both parts matter, and they fix different halves of the same problem.
//
// The TTL is what makes *reopening* a comic instant. Resolving a 3hentai gallery
// means fetching and parsing its detail page through the scraper, which is a real
// HTTP round trip *behind the politeness throttle* — so it costs the delay whether
// or not anything has changed. A gallery's page list doesn't change, so paying that
// again for a comic the user closed and reopened is pure latency.
//
// Single-flight is what makes *opening* it once. A client that opens a comic
// typically asks for the pages and then starts pulling them, and an impatient
// double-tap (or the reader and a save racing) used to mean two concurrent fetches
// of the same detail page — each queued behind the other's throttle, so the second
// one paid the delay twice over. Callers arriving while a resolution is in flight
// now wait on it instead of starting another.
//
// Failures are not cached: a site that was briefly unreachable should be retried on
// the next click, not remembered as empty for ten minutes.
type resolveCache[T any] struct {
	ttl time.Duration

	mu      sync.Mutex
	entries map[string]*cacheEntry[T]
}

type cacheEntry[T any] struct {
	// done is closed when the resolution finishes; until then it is the flag that
	// makes other callers wait rather than start their own fetch.
	done chan struct{}
	val  T
	err  error
	at   time.Time // when the value landed; the TTL runs from here
}

func newResolveCache[T any](ttl time.Duration) *resolveCache[T] {
	return &resolveCache[T]{ttl: ttl, entries: map[string]*cacheEntry[T]{}}
}

// get returns the cached value for key, resolving it with fn if it is missing or
// stale. Concurrent callers for the same key share one resolution.
func (c *resolveCache[T]) get(ctx context.Context, key string, fn func(context.Context) (T, error)) (T, error) {
	c.mu.Lock()
	if e, ok := c.entries[key]; ok {
		select {
		case <-e.done:
			// Resolved. A fresh success is the answer; a stale one (or a remembered
			// error, which we never keep) falls through to a re-resolve.
			if e.err == nil && time.Since(e.at) < c.ttl {
				c.mu.Unlock()
				return e.val, nil
			}
			delete(c.entries, key)
		default:
			// In flight — wait for whoever is already fetching this.
			c.mu.Unlock()
			select {
			case <-e.done:
				return e.val, e.err
			case <-ctx.Done():
				var zero T
				return zero, ctx.Err()
			}
		}
	}

	e := &cacheEntry[T]{done: make(chan struct{})}
	c.entries[key] = e
	c.mu.Unlock()

	// The resolution deliberately does NOT run on the caller's ctx being the only
	// thing that can kill it — but it does use it, because a lone caller giving up
	// should not leave a fetch running forever. Waiters that arrive later inherit
	// the result either way.
	e.val, e.err = fn(ctx)
	e.at = time.Now()
	close(e.done)

	// An error is not worth remembering; drop the entry so the next click retries.
	if e.err != nil {
		c.mu.Lock()
		if cur, ok := c.entries[key]; ok && cur == e {
			delete(c.entries, key)
		}
		c.mu.Unlock()
	}
	return e.val, e.err
}
