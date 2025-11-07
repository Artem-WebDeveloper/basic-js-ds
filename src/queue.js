const { NotImplementedError } = require('../lib/errors');
const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  getUnderlyingList() {
    if (!this.head) return null;

    let node = this.head;
    const res = { value: node.value, next: null };
    let current = res;

    while (node.next) {
      node = node.next;
      current.next = { value: node.value, next: null };
      current = current.next;
    }

    return res;
  }

  enqueue(value) {
    const node = new ListNode(value);
    if (!this.head && !this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    return;
  }

  dequeue() {
    if (!this.head) return;

    let temp = this.head.value;
    this.head = this.head.next;

    if (!this.head) this.tail = null;
    return temp;
  }
}

module.exports = {
  Queue,
};
