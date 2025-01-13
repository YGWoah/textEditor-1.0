import { Action } from "../types/types";

class CircularBuffer {
  capacity: number;
  buffer: Action[];
  head: number;
  tail: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.buffer = new Array(100);
    this.head = 0;
    this.tail = 0;
  }

  push(element: Action) {
    if (this.isFull()) {
      this.buffer[this.tail] = element;
      this.head = (this.head + 1) % this.capacity;
      this.tail = (this.tail + 1) % this.capacity;
    } else {
      this.buffer[this.head] = element;
      this.head = (this.head + 1) % this.capacity;
    }
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    } else {
      const element = this.buffer[this.head - 1];
      this.head = (this.head - 1) % this.capacity;
      return element;
    }
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    } else {
      return this.buffer[this.head - 1];
    }
  }

  isFull() {
    return this.head + 1 - this.tail === this.capacity || this.tail > this.head;
  }

  isEmpty() {
    return this.head === this.tail;
  }
}

export default CircularBuffer;
