package api

import (
	"strings"
	"testing"
	"time"
)

func TestDecayHeat(t *testing.T) {
	now := time.Now()
	cases := []struct {
		name string
		bond libbyBond
		want float64
	}{
		{"no bond reads calm", libbyBond{}, 1},
		{"just stopped stays hot", libbyBond{Heat: 5, LastSeenAt: now.UnixMilli()}, 5},
		{"an hour cools a little", libbyBond{Heat: 5, LastSeenAt: now.Add(-1 * time.Hour).UnixMilli()}, 5 - heatDecayPerHour},
		{"a day is back to calm", libbyBond{Heat: 5, LastSeenAt: now.Add(-24 * time.Hour).UnixMilli()}, 1},
		{"never goes below one", libbyBond{Heat: 2, LastSeenAt: now.Add(-100 * time.Hour).UnixMilli()}, 1},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			got := decayHeat(c.bond, now)
			if diff := got - c.want; diff > 0.001 || diff < -0.001 {
				t.Fatalf("decayHeat = %v, want %v", got, c.want)
			}
		})
	}
}

func TestHumanizeGap(t *testing.T) {
	cases := []struct {
		d    time.Duration
		want string
	}{
		{30 * time.Second, ""},
		{10 * time.Minute, "a few minutes"},
		{2 * time.Hour, "a little while"},
		{5 * time.Hour, "a few hours"},
		{28 * time.Hour, "about a day"},
		{3 * 24 * time.Hour, "a few days"},
		{10 * 24 * time.Hour, "over a week"},
		{60 * 24 * time.Hour, "a long time"},
	}
	for _, c := range cases {
		if got := humanizeGap(c.d); got != c.want {
			t.Errorf("humanizeGap(%v) = %q, want %q", c.d, got, c.want)
		}
	}
}

func TestBondPromptBlock(t *testing.T) {
	now := time.Now()

	// A fresh user with no history gets no block, so a first conversation reads fresh.
	if got := bondPromptBlock(libbyBond{}, now); got != "" {
		t.Fatalf("empty bond should render nothing, got %q", got)
	}

	// Mid-conversation (just spoke): the gap/mood/afterglow lines stay silent because the
	// live history already carries them. A close bond still surfaces its standing facts.
	mid := libbyBond{LastSeenAt: now.Add(-30 * time.Second).UnixMilli(), Mood: "mischievous", Heat: 5, Warmth: 0.9, Petname: "trouble"}
	got := bondPromptBlock(mid, now)
	if strings.Contains(got, "since the two of you last talked") || strings.Contains(got, "were feeling") || strings.Contains(got, "warmed up") {
		t.Errorf("mid-conversation block should not restate gap/mood/afterglow, got %q", got)
	}
	if !strings.Contains(got, "trouble") {
		t.Errorf("standing pet name should always show, got %q", got)
	}

	// Returning after a real break: the gap, carried mood, and afterglow all surface.
	back := libbyBond{LastSeenAt: now.Add(-2 * time.Hour).UnixMilli(), Mood: "loving", Heat: 5, Warmth: 0.9, Petname: "trouble"}
	got = bondPromptBlock(back, now)
	for _, want := range []string{"since the two of you last talked", "were feeling loving", "warmed up", "trouble"} {
		if !strings.Contains(got, want) {
			t.Errorf("returning block missing %q, got %q", want, got)
		}
	}
}

func TestSameCalendarDay(t *testing.T) {
	base := time.Date(2026, 7, 23, 23, 0, 0, 0, time.Local)
	if !sameCalendarDay(base, base.Add(30*time.Minute)) {
		t.Error("same evening should be the same day")
	}
	if sameCalendarDay(base, base.Add(2*time.Hour)) {
		t.Error("crossing midnight should be a new day")
	}
}
