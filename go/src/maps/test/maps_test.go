package tests

import (
	"testing"

	"github.com/drylib/drylib/go/src/maps/str"
)

func TestStrMap(t *testing.T) {
	m := str.Map{}
	m.Add("a", "b")
	m.Add("c", "d")

	t.Run(`Get a`, func(t *testing.T) {
		if m.Get("a") != "b" {
			t.Fail()
		}
	})

	t.Run(`Get c`, func(t *testing.T) {
		if m.Get("c") != "d" {
			t.Fail()
		}
	})

	t.Run(`m.It()[0].Key != "a"`, func(t *testing.T) {
		if m.It()[0].Key != "a" {
			t.Fail()
		}
	})
}
