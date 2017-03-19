// Package main implements unit tests for tr package
package tr_test

import (
	"fmt"
	"testing"

	"tr"
)

// TestA tests one node with node.Add("a")
func TestA(t *testing.T) {
	var node tr.Node
	node.Add("a")
	t.Run("HasChild", func(t *testing.T) {
		if !node.HasChild() {
			t.Fail()
		}
	})
	t.Run("String()", func(t *testing.T) {
		if node.String() != "a" {
			t.Fail()
		}
	})
}

// TestAB tests 2 nodes a,b on one level
func TestAB(t *testing.T) {
	var node tr.Node
	a := node.Add("a")
	b := node.Add("b")
	t.Run("a!=b", func(t *testing.T) {
		if a == b {
			t.Fail()
		}
	})
	t.Run("String()", func(t *testing.T) {
		if node.String() != "ab" {
			t.Fail()
		}
	})
}

// TestGet tests adding and getting nodes by key
func TestGet(t *testing.T) {
	var node tr.Node
	a := node.Get("a")
	b := node.Get("b")
	t.Run("a!=b", func(t *testing.T) {
		if a == b {
			t.Fail()
		}
	})
	t.Run("a.String()==``", func(t *testing.T) {
		if a.String() != "" {
			t.Fail()
		}
	})
	t.Run("b.String()==``", func(t *testing.T) {
		if a.String() != "" {
			t.Fail()
		}
	})
	t.Run("String()==``", func(t *testing.T) {
		if node.String() != "" {
			t.Fail()
		}
	})

	t.Run(`node.Get("a") != node.Get("a")`, func(t *testing.T) {
		if node.Get("a") != a {
			t.Fail()
		}
	})

	node.Get("a").Get("c").Add("c1")
	node.Get("a").Get("c").Add("c2")
	t.Run(`node.Get("a").Get("c").String() != "c1c2"`, func(t *testing.T) {
		if node.Get("a").Get("c").String() != "c1c2" {
			t.Fail()
		}
	})
	t.Run(`node.Get("a").String() != "c1c2"`, func(t *testing.T) {
		if node.Get("a").String() != "c1c2" {
			t.Fail()
		}
	})
}

func main() {
	fmt.Println("started")
	node := tr.Node{}
	node.Add("a")
	if node.String() != "a" {
		panic("node.String != 'a'")
	}

	node = tr.Node{}
	a := node.Get("a")
	if a != node.Get("a") {
		panic(`node.Get("a") != node.Get("a")`)
	}

	b := node.Get("b")
	if a == b {
		panic("a == b")
	}
	if node.String() != "" {
		panic("node.String != ''")
	}
	node.Get("a").Get("c").Add("c1")
	if node.Get("a").Get("c") != node.Get("a").Get("c") {
		panic(`node.Get("a").Get("c") != node.Get("a").Get("c")`)
	}
	node.Get("a").Get("c").Add("c2")
	if node.Get("a").Get("c").String() != "c1c2" {
		panic("got " + node.Get("a").Get("c").String())
	}

	fmt.Println("finished")
}
