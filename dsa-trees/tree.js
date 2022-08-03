/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    // if input a empty tree, return 0
    if (!this.root) return 0;
    const toVisitStack = [this.root];
    let sum = 0;
    // depth first method
    while (toVisitStack.length) {
      const current = toVisitStack.pop();
      sum += current.val;
      for (let child of current.children) {
        toVisitStack.push(child);
      }
    }
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;
    const toVisitStack = [this.root];
    let count = 0;
    while (toVisitStack.length) {
      const current = toVisitStack.pop();
      // count only even number
      if (current.val % 2 === 0) count++;
      for (let child of current.children) {
        toVisitStack.push(child);
      }
    }
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;
    const toVisitStack = [this.root];
    let count = 0;
    while (toVisitStack.length) {
      const current = toVisitStack.pop();
      // count only greater number
      if (current.val > lowerBound) count++;
      for (let child of current.children) {
        toVisitStack.push(child);
      }
    }
    return count;
  }
}

module.exports = { Tree, TreeNode };
