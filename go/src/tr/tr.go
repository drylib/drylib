// Package tr implements tree of string keys and string values that preserves order of insertion
// convenient for output text generation
package tr

import (
	"bytes"
	"sync"
)

// Node in the tree of strings
type Node struct {
	val     string
	exclude bool // exclude from output, set to true for keyed nodes
	names   map[string]*Node
	last    *queue
	first   *queue
	Locker  sync.RWMutex
}

type queue struct {
	node *Node
	next *queue
}

// Add adds new value node into sequence of children
func (node *Node) Add(val string) *Node {
	node.Locker.Lock()
	defer node.Locker.Unlock()
	return node.add(val)
}

func (node *Node) add(val string) *Node {
	ret := &Node{val: val}
	if node.first == nil {
		node.first = &queue{node: ret}
		node.last = node.first
	} else {
		node.last.next = &queue{node: ret}
		node.last = node.last.next
	}
	return ret
}

// Get returns existing or adds new key with new node into map of children
func (node *Node) Get(key string) *Node {
	node.Locker.Lock()
	defer node.Locker.Unlock()
	return node.get(key)
}

func (node *Node) get(key string) *Node {
	if node.names == nil {
		node.names = make(map[string]*Node)
	}
	if ret, ok := node.names[key]; ok {
		return ret
	}
	ret := node.add(key)
	node.names[key] = ret
	ret.exclude = true
	return ret
}

// Children returns channel of children nodes
func (node *Node) Children() <-chan *Node {
	ret := make(chan *Node)
	node.Locker.RLock()
	defer node.Locker.RUnlock()
	var first, last *queue
	for child := node.first; child != nil; child = child.next {
		if first == nil {
			first = &queue{node: child.node}
			last = first
		} else {
			last.next = &queue{node: child.node}
			last = last.next
		}
	}
	go func() {
		for child := first; child != nil; child = child.next {
			ret <- child.node
		}
		close(ret)
	}()
	return ret
}

// String returns string value of node as aggregate of all values in subtree
func (node *Node) String() string {
	var ret bytes.Buffer
	node.WriteVal(&ret)
	return ret.String()
}

// WriteVal writes node value to buffer
func (node *Node) WriteVal(buf *bytes.Buffer) *Node {
	node.Locker.RLock()
	defer node.Locker.RUnlock()
	if !node.exclude {
		buf.WriteString(node.val)
	}
	for child := node.first; child != nil; child = child.next {
		child.node.WriteVal(buf)
	}
	return node
}

// HasChild returns true if node does not have any children
func (node *Node) HasChild() bool {
	return node.first != nil
}

// Include marks  keyed node to be included into String output
func (node *Node) Include() *Node {
	node.Locker.Lock()
	defer node.Locker.Unlock()
	node.exclude = false
	return node
}
