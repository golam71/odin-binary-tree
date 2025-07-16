class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  insert(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) node.left = newNode;
      else this.insert(node.left, newNode);
    } else if (newNode.data > node.data) {
      if (node.right === null) node.right = newNode;
      else this.insert(node.right, newNode);
    }
  }

  remove(node, value) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this.remove(node.left, value);
    } else if (value > node.data) {
      node.right = this.remove(node.right, value);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      let temp = node.right;
      while (temp.left !== null) {
        temp = temp.left;
      }

      node.data = temp.data;

      node.right = this.remove(node.right, temp.data);
    }

    return node;
  }

  buildTree(array) {
    const sorted = [...new Set(array)].sort((a, b) => a - b);

    function buildRecursive(arr) {
      if (!arr.length) return null;

      const mid = Math.floor(arr.length / 2);
      const node = new Node(arr[mid]);

      node.left = buildRecursive(arr.slice(0, mid));
      node.right = buildRecursive(arr.slice(mid + 1));

      return node;
    }

    return buildRecursive(sorted);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
console.log("---------------------")
tree.remove(tree.root, 67);
prettyPrint(tree.root);
