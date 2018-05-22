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
        // bst.insert(9, null)
        // bst.insert(2, null)
        // bst.insert(5, null)
        // bst.insert(7, null)
        console.log(isBST(bst));
        // console.log(isBST(bst));
}

main();

let bad = {
    key: 3,
    // parent: null,
    // value: null,
    left: {
        key: 5,
        // value: null,
        // right: null
        },
    right: null
    
}


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

function sarahHeight(bst) {
    if (bst === null) {
        return 0;
    } else if (!bst.left && !bst.right) { //if no L or R, -> leaf nodes 
        return 1;
    } else if (bst.left || bst.right) { //has L/R or both
        return Math.max(sarahHeight(bst.left), sarahHeight(bst.right)) + 1;
    }
}


//everything on left is less, everything on right is greater
// check the nodes 
function isItBst2(bst) {
    if (bst.left.value > bst.value) {
        return false;
    }
    if (bst.right.value < bst.value) {
        return false;
    }
    else {
        return true;
    }
}

function isBST(bst) {

    if (!bst.left && !bst.right) { //hit a leaf
        return true;
    } 

    //if left is greater than key OR R is less, it's a no
    if(bst.left) {
        if(bst.left.key > bst.key) {
            return false;
        }
    }
    if(bst.right) {
        if(bst.right.key < bst.key) {
            return false;
        } 
    } else if (bst.left && bst.right) { //if there is l & r, return both recursive values
        return isBST(bst.left) + isBST(bst.right);
    } 
    else if (bst.left) {
        return isBST(bst.left);
    
    } else if (bst.right) {
        return isBST(bst.right);
    }

}


function thirdLargestNode(bst) {

}