// Package main implements unit tests for queue package
package queue_test

import (
	"testing"

	"queue"
)

type x struct {
	i int
}

// specializing queue for type x due to lack of generics
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

// Testx tests one queue specialized for type x
func TestXQueue(t *testing.T) {
	q := xQueue{}
	q.Enqueue(x{1})
	q.Enqueue(x{2})

	t.Run("q.Dequeue().i != 1", func(t *testing.T) {
		if q.Dequeue().i != 1 {
			t.Fail()
		}
	})
	t.Run("q.Dequeue().i != 2", func(t *testing.T) {
		if q.Dequeue().i != 2 {
			t.Fail()
		}
	})
}
