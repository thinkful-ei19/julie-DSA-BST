class BinarySearchTree {
    constructor(key=null, value=null, parent=null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        //if the tree is empty then this key being inserted is the root node of the tree
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        // If the new key is less than the node's key 
        // needs to live in the LEFT
        else if (key < this.key) {
            //if the existing node does not have any left child, 
            //instantiate & insert new node  
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this); //pass 'this' as parent
            }
            //if the node has an existing left child, 
            //then we recursively call the `insert` method 
            //so the node is added further down the tree.
            else {
                this.left.insert(key, value); //recursive shit right here
            }
        }
        //Similarly, if the new key is greater than the node's key 
        //then you do the same thing, but on the RIGHT side.
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }
    find(key) {
        //if the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        }
        //if the item less than the root go LEFT
        //if there is an existing left child, 
        //then recursively check its left and/or right child
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        //if the item is greater than the root go RIGHT
        //if there is an existing right child, 
        //then recursively check its left and/or right child
        //until you find the item.
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        //You have search the treen and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }
    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            //If the node only has a left child, 
            //then you replace the node with its left child.  
            else if (this.left) {
                this._replaceWith(this.left);
            }
            //And similarly if the node only has a right child 
            //then you replace it with its right child.
            else if (this.right) {
                this._replaceWith(this.right);
            }
            //If the node has no children then
            //simply remove it and any references to it 
            //by calling "this._replaceWith(null)".
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}

function main() {
    let bst = new BinarySearchTree();
        bst.insert(3, null)
        bst.insert(1, null)
        bst.insert(4, null)
        bst.insert(6, null)
        bst.insert(9, null)
        bst.insert(2, null)
        bst.insert(5, null)
        bst.insert(7, null)
        
        console.log(findHeight(bst));
}

main();


function findHeight(bst) {
    if (!bst) {
        return 0;
    }
    let leftHeight = findHeight(bst.left);
    let rightHeight = findHeight(bst.right);

    if(leftHeight>rightHeight) {
        return leftHeight + 1;
    } else {
        return rightHeight + 1;
    }
}





// binary tree
//everything on left is less, everything on right is greater
// check the nodes 
