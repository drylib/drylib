package main

import (
	"fmt"

	"tr"
)

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
