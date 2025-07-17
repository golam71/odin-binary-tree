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

  buildTree(array) {
    const sorted = [...new Set(array)].sort((a, b) => a - b);

    const buildRecursive = (arr) => {
      if (!arr.length) return null;

      const mid = Math.floor(arr.length / 2);
      const node = new Node(arr[mid]);

      node.left = buildRecursive(arr.slice(0, mid));
      node.right = buildRecursive(arr.slice(mid + 1));

      return node;
    };

    return buildRecursive(sorted);
  }

  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    this.insertValue(this.root, newNode);
  }

  insertValue(node, newNode) {
    if (newNode.data < node.data) {
      if (!node.left) node.left = newNode;
      else this.insertValue(node.left, newNode);
    } else if (newNode.data > node.data) {
      if (!node.right) node.right = newNode;
      else this.insertValue(node.right, newNode);
    }
  }

  deleteItem(node = this.root, value) {
    if (!node) return null;

    if (value < node.data) {
      node.left = this.deleteItem(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteItem(node.right, value);
    } else {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let temp = node.right;
      while (temp.left) temp = temp.left;
      node.data = temp.data;
      node.right = this.deleteItem(node.right, temp.data);
    }

    return node;
  }

  find(value, node = this.root) {
    if (!node) return null;
    if (value < node.data) return this.find(value, node.left);
    else if (value > node.data) return this.find(value, node.right);
    return node;
  }

  depth(value) {
    let depth = 0;
    const findDepth = (value, node) => {
      if (!node) return null;
      if (value < node.data) {
        depth++;
        return findDepth(value, node.left);
      } else if (value > node.data) {
        depth++;
        return findDepth(value, node.right);
      } else if (value === node.data) return depth;
      return null;
    };
    return findDepth(value, this.root);
  }

  height(value) {
    const node = this.find(value);
    if (!node) return null;

    const calcHeight = (n) => {
      if (!n) return -1;
      return 1 + Math.max(calcHeight(n.left), calcHeight(n.right));
    };

    return calcHeight(node);
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") throw new Error("Callback required");
    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") throw new Error("Callback required");
    if (!node) return;
    this.inOrderForEach(callback, node.left);
    callback(node);
    this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") throw new Error("Callback required");
    if (!node) return;
    callback(node);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (typeof callback !== "function") throw new Error("Callback required");
    if (!node) return;
    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node);
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    const height = (n) => {
      if (!n) return -1;
      return 1 + Math.max(height(n.left), height(n.right));
    };

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    const balanced = Math.abs(leftHeight - rightHeight) <= 1;

    return (
      balanced && this.isBalanced(node.left) && this.isBalanced(node.right)
    );
  }

  rebalance() {
    const nodes = [];
    this.inOrderForEach((node) => nodes.push(node.data));
    this.root = this.buildTree(nodes);
  }
}

// Pretty print function
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

// Driver script
function randomArray(size = 15, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

function printOrders(tree) {
  console.log("Level-order:");
  tree.levelOrderForEach((node) => console.log(node.data));
  console.log("Pre-order:");
  tree.preOrderForEach((node) => console.log(node.data));
  console.log("Post-order:");
  tree.postOrderForEach((node) => console.log(node.data));
  console.log("In-order:");
  tree.inOrderForEach((node) => console.log(node.data));
}

// Create & test tree
const tree = new Tree(randomArray());

console.log("Initial tree:");
prettyPrint(tree.root);
console.log("Is balanced:", tree.isBalanced());
printOrders(tree);

// Unbalance tree
tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);

console.log("\nUnbalanced tree:");
prettyPrint(tree.root);
console.log("Is balanced:", tree.isBalanced());

// Rebalance
tree.rebalance();

console.log("\nRebalanced tree:");
prettyPrint(tree.root);
console.log("Is balanced:", tree.isBalanced());
printOrders(tree);
