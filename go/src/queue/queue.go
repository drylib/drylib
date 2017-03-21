// Package queue implements queue of objects as linked list
package queue

// Queue header
type Queue struct {
	first *item
	last  *item
}

type item struct {
	data interface{}
	next *item
}

// Enqueue item into the end of the Queue
func (queue *Queue) Enqueue(data interface{}) interface{} {
	if queue.first == nil {
		queue.first = &item{data: data}
		queue.last = queue.first
	} else {
		queue.last.next = &item{data: data}
		queue.last = queue.last.next
	}
	return data
}

// Dequeue item from the beginning of the Queue
func (queue *Queue) Dequeue() interface{} {
	if queue.first == nil {
		return nil
	}
	ret := queue.first.data
	queue.first = queue.first.next
	if queue.first == nil {
		queue.last = nil
	}
	return ret
}
