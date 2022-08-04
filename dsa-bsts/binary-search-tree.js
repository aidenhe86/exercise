class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let cur = this.root;
    const newNode = new Node(val);
    // insert root if root is null
    if (cur === null) {
      this.root = newNode;
      return this;
    }

    // search for spot
    while (cur !== null) {
      if (cur.val < val) {
        if (cur.right === null) {
          cur.right = newNode;
          return this;
        }
        cur = cur.right;
      } else if (cur.val > val) {
        if (cur.left === null) {
          cur.left = newNode;
          return this;
        }
        cur = cur.left;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    let cur = this.root;
    const newNode = new Node(val);
    if (cur === null) {
      this.root = newNode;
      return this;
    }
    const insertHelper = (cur) => {
      // right side
      if (cur.val < val) {
        if (cur.right === null) {
          cur.right = newNode;
          return this;
        }
        return insertHelper(cur.right);
      }
      // left side
      if (cur.val > val) {
        if (cur.left === null) {
          cur.left = newNode;
          return this;
        }
        return insertHelper(cur.left);
      }
    };
    return insertHelper(cur);
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let cur = this.root;

    // if not found or root is null, return undefined
    while (cur !== null) {
      // if less than, move to left node
      if (cur.val > val) {
        cur = cur.left;
      }
      // if greater than, move to right node
      else if (cur.val < val) {
        cur = cur.right;
      } else {
        // return node when found
        return cur;
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, cur = this.root) {
    // if root is null or reach to end, return undefined
    if (cur === null) return undefined;
    if (cur.val > val) return this.findRecursively(val, cur.left);
    if (cur.val < val) return this.findRecursively(val, cur.right);
    return cur;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let cur = this.root;
    const arr = [];

    const preOrderHelper = (cur) => {
      arr.push(cur.val);
      if (cur.left) preOrderHelper(cur.left);
      if (cur.right) preOrderHelper(cur.right);
    };
    preOrderHelper(cur);
    return arr;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let cur = this.root;
    const arr = [];

    const inOrderHelper = (cur) => {
      if (cur.left) inOrderHelper(cur.left);
      arr.push(cur.val);
      if (cur.right) inOrderHelper(cur.right);
    };
    inOrderHelper(cur);
    return arr;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let cur = this.root;
    const arr = [];

    const postOrderHelper = (cur) => {
      if (cur.left) postOrderHelper(cur.left);
      if (cur.right) postOrderHelper(cur.right);
      arr.push(cur.val);
    };
    postOrderHelper(cur);
    return arr;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let queue = [this.root];
    const arr = [];

    while (queue.length) {
      let cur = queue.shift();
      arr.push(cur.val);
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    return arr;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {}

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {}

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {}
}

module.exports = BinarySearchTree;
