/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  // get node by index
  _get(idx) {
    let node = this.head;
    let count = 0;
    while (node !== null && count !== idx) {
      count += 1;
      node = node.next;
    }
    return node;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);
    if (!this.head) this.head = newNode;
    if (this.tail !== null) this.tail.next = newNode;
    this.tail = newNode;
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
    // check if just insert a head
    if (this.length === 0) this.tail = newNode;
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (this.length <= idx || idx < 0) {
      throw new Error("Invalid index.");
    }

    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (this.length <= idx || idx < 0) {
      throw new Error("Invalid index.");
    }

    let node = this._get(idx);
    node.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (this.length < idx || idx < 0) {
      throw new Error("Invalid index.");
    }

    // check if insert at beginning
    if (idx === 0) return this.unshift(val);

    // check if insert in the end
    if (idx === this.length) return this.push(val);

    // get node before given index
    let pre = this._get(idx - 1);

    let newNode = new Node(val);
    newNode.next = pre.next;
    pre.next = newNode;
    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (this.length <= idx || idx < 0) {
      throw new Error("Invalid index.");
    }

    // special case for remove first node;
    if (idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      this.length -= 1;
      // check if list is empty, set tail equal to (null)
      if (this.length === 0) this.tail = null;
      return val;
    }

    // get previous node and the remove value
    let pre = this._get(idx - 1);
    let val = pre.next.val;

    // special case for remove last node
    if (idx === this.length - 1) {
      pre.next = null;
      this.tail = pre;
      this.length -= 1;
      return val;
    }

    // general case
    pre.next = pre.next.next;
    this.length -= 1;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    // check if list is empty
    if (this.length === 0) return 0;

    let total = 0;
    let cur = this.head;
    while (cur !== null) {
      total += cur.val;
      cur = cur.next;
    }
    return total / this.length;
  }
}

module.exports = LinkedList;
