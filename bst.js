class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = null;
    this.buildTree(array);
  }

  insert(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) node.left = newNode;
      else this.insert(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else this.insert(node.right, newNode);
    }
  }

  buildTree(array) {
    for (const item of array) {
      const newNode = new Node(item);
      if (this.root === null) this.root = newNode;
      else this.insert(this.root, newNode);
    }
  }
}
