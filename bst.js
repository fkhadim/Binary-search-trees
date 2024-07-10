class Node {
    constructor(data, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }   
}

class Tree {
    constructor(array){
        this.root = this.buildTree(array, 0, array.length - 1)
    }

    // builds tree from array and sets the root node of the tree
    buildTree(array, start, end){
        if(start>end){
            return null
        }
        let mid = Math.floor((start + end) / 2)
        let left = this.buildTree(array, start, mid-1)
        let right = this.buildTree(array, mid+1, end)
        let root = new Node(array[mid], left, right )

        return root;
    }

    // copied function to print the tree to the console
    prettyPrint(node = this.root, prefix = "", isLeft = true){
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
  
    insert(value, node = this.root){
      if(node.left === null || node.right === null){
        if (value < node.data){
          node.left = new Node(value)
        }
        else if(value >= node.data){
          node.right = new Node(value)
        }
        return
      }
      let next = value < node.data ? node.left : node.right
      this.insert(value, next)
    }

    delete(value, node = this.root){
      let parent = node;
      let next = value < node.data ? node.left : node.right
      
      // if node has no children
      if(next.left === null && next.right === null && next.data === value){
        if (next.data < parent.data){
          parent.left = null;
          return
        }
        else if (next.data >= parent.data){
          parent.right = null;
          return
        }
      }

      // if node has one child, left or right
      if(next.data === value && next.left === null){
        if(next.data < parent.data){
          parent.left = next.right;
          return
        }
        else if(next.data >= parent.data){
          parent.right = next.right;
          return
        }
      }

      if(next.data === value && next.right === null){
        if(next.data < parent.data){
          parent.left = next.left;
          return
        }
        else if(next.data >= parent.data){
          parent.right = next.left;
          return
        }
      }

      // if node has 2 children

      // if root node is node to be removed

      if (parent.data === value){
        let successor = parent.right;
        let successorParent;
        if (successor.left){
          while(successor.left){
            successorParent = successor;
            successor = successor.left;
          }
          successorParent.left = successor.right ? successor.right : null
          successor.right = parent.right;
          successor.left = parent.left;
          this.root = successor
          parent.right = null;
          parent.left = null;
          return
        }
        successor.left = parent.left
        this.root = successor
        parent.right = null;
        parent.left = null;
        return
      }

      // if node to be removed has 2 children and isnt root node
      if(next.data === value){
        let successor = next.right
        let successorParent;
        if(successor.left){
          while(successor.left){
            successorParent = successor;
            successor = successor.left;
          }
          successorParent.left = successor.right ? successor.right : null
          successor.right = next.right;
          successor.left = next.left;
          next.left = null;
          next.right = null;
          if (next.data < parent.data){
            parent.left = successor;
          }
          else parent.right = successor;
          return
        }
        console.log(successor)
        successor.left = next.left;
        next.left = null;
        next.right = null;
        if (next.data < parent.data){
          parent.left = successor;
        }
        else parent.right = successor;
        return
      }
      this.delete(value, next);
    }

    find(value, node = this.root){
      if(node.data === value){
        return node
      }
      if(node.left === null && node.right === null){
        return null
      }
      let next = value < node.data ? node.left : node.right;
      return this.find(value, next);
    }

    levelOrder(callback){
      let queue = [this.root]
      while (queue.length >= 1){
        callback(queue[0])
        if (queue[0].left){
          queue.push(queue[0].left)
        }
        if (queue[0].right){
          queue.push(queue[0].right)
        }
        queue.shift()
      }
    }

    inOrder(callback, node = this.root) {
      if (!node) {
          return;
      }
  
      let stack = [];
      let current = node;
  
      while (current || stack.length > 0) {
          while (current) {
              stack.push(current);
              current = current.left;
          }
  
          current = stack.pop();
          callback(current);
  
          current = current.right;
      }
      
    }

    preOrder(callback, node = this.root) {
    if (!node) {
        return;
    }

    let stack = [];
    let current = node;
    stack.push(current)

    while (stack.length > 0) {

      current = stack.pop();
      callback(current);
      
      if (current.right){
        stack.push(current.right)
      }

      if(current.left){
        stack.push(current.left)
      }
    }
    
    }

    postOrder(callback, node = this.root) {
      if (!node) {
          return;
      }
  
      let stack = [];
      let lastVisited = null;
      let current = node;
  
      while (stack.length > 0 || current !== null) {
          if (current !== null) {
              stack.push(current);
              current = current.left;
          } else {
              let peekNode = stack[stack.length - 1];
              if (peekNode.right !== null && lastVisited !== peekNode.right) {
                  current = peekNode.right;
              } else {
                  callback(peekNode);
                  lastVisited = stack.pop();
              }
          }
      }
  }

}

const bt = new Tree([1,2,5,8,9,10,12])
bt.prettyPrint()
bt.preOrder((node) => {
  console.log(node.data)
 })

const array = [1,2,3,4,5,6,7,8]









