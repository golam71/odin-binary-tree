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

  insertValue(node = this.root, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) node.left = newNode;
      else this.insertValue(node.left, newNode);
    } else if (newNode.data > node.data) {
      if (node.right === null) node.right = newNode;
      else this.insertValue(node.right, newNode);
    }
  }

  find(value, node = this.root) {
    if (node === null) return null;

    if (value < node.data) {
      return this.find(value, node.left);
    } else if (value > node.data) {
      return this.find(value, node.right);
    } else {
      return node;
    }
  }

  depth(value) {
    let depthOfNode = 0;

    function findDepth(value, node) {
      if (node === null) return null;

      if (value < node.data) {
        depthOfNode++;
        return findDepth(value, node.left);
      } else if (value > node.data) {
        depthOfNode++;
        return findDepth(value, node.right);
      } else if (value === node.data) {
        return depthOfNode;
      }

      return null;
    }

    return findDepth(value, this.root);
  }

  height(value) {
    let node = this.find(value);
    if (node.right == null && node.left == null) {
      return 0;
    }
    function calcHeight(node) {
      if (node === null) return -1;
      const leftHeight = calcHeight(node.left);
      const rightHeight = calcHeight(node.right);
      return 1 + Math.max(leftHeight, rightHeight);
    }

    return calcHeight(node);
  }
  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertValue(this.root, newNode);
    }
  }

  deleteItem(node = this.root, value) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this.deleteItem(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteItem(node.right, value);
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

      node.right = this.deleteItem(node.right, temp.data);
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
  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
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
// console.log("---------------------");
// tree.deleteItem(tree.root, 8);
// prettyPrint(tree.root);

console.log(tree.height(8));
