const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = addWithin(this._root, data);

    function addWithin(node, data) {
      if (!node) return new Node(data);

      if (node.data === data) return node;

      if (data < node.data) node.left = addWithin(node.left, data);
      else node.right = addWithin(node.right, data);

      return node;
    }
  }

  find(data) {
    return search(this._root, data);

    function search(node, data) {
      if (!node) return null;
      if (node.data === data) return node;
      return data < node.data
        ? search(node.left, data)
        : search(node.right, data);
    }
  }

  has(data) {
    return Boolean(this.find(data));
  }

  remove(data) {
    this._root = removeNode(this._root, data);

    function removeNode(node, data) {
      if (!node) return null;

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
      }

      if (!node.left) {
        node = node.right;
        return node;
      }

      if (!node.right) {
        node = node.left;
        return node;
      }

      let minFromRight = node.right;
      while (minFromRight.left) {
        minFromRight = minFromRight.left;
      }
      node.data = minFromRight.data;

      node.right = removeNode(node.right, minFromRight.data);

      return node;
    }
  }

  min() {
    if (!this._root) return;

    let node = this._root;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this._root) return;

    let node = this._root;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
