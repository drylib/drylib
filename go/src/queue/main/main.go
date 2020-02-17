package main

import (
	"fmt"

	"github.com/drylib/drylib/go/src/queue"
)

type intQueue struct {
	base queue.Queue
}

func (queue *intQueue) Enqueue(val int) int {
	queue.base.Enqueue(val)
	return val
}
func (queue *intQueue) Dequeue() int {
	return queue.base.Dequeue().(int)
}

type x struct {
	i int
}

type xQueue struct {
	base queue.Queue
}

func (queue *xQueue) Enqueue(val x) x {
	queue.base.Enqueue(val)
	return val
}
func (queue *xQueue) Dequeue() x {
	return queue.base.Dequeue().(x)
}

func main() {
	fmt.Println("started")
	t := intQueue{}
	t.Enqueue(1)
	if t.Dequeue() != 1 {
		panic(`t.Dequeue() != 1`)
	}
	t.Enqueue(2)
	t.Enqueue(3)
	if t.Dequeue() != 2 {
		panic(`t.Dequeue() != 2`)
	}
	if t.Dequeue() != 3 {
		panic(`t.Dequeue() != 3`)
	}

	t2 := xQueue{}
	t2.Enqueue(x{1})
	t2.Enqueue(x{2})
	if t2.Dequeue().i != 1 {
		panic(`t2.Dequeue().i != 1`)
	}
	if t2.Dequeue().i != 2 {
		panic(`t2.Dequeue().i != 2`)
	}

	fmt.Println("finished")
}
