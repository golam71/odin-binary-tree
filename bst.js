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
    } else {
      if (node.right === null) node.right = newNode;
      else this.insert(node.right, newNode);
    }
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
