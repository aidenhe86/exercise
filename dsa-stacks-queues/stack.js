/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */
  // add node to first but treat as last input item
  push(val) {
    let newNode = new Node(val);
    newNode.next = this.first;
    this.first = newNode;
    // check if just insert the first node;
    if (this.size === 0) this.last = newNode;
    this.size += 1;
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if (this.length === 0) {
      throw new Error("Quene is empty");
    }
    let val = this.first.val;
    this.first = this.first.next;
    this.size -= 1;
    return val;
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    return this.first.val;
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    if (this.size > 0) {
      return false;
    }
    return true;
  }
}

module.exports = Stack;
