class Node{
    constructor(value){
        this.right = null;
        this.left = null;
        this.parent = null;
        this.data = value;
    }
    add(node){
        if(node.data > this.data){
            this.addToSide("right" , node);
        }
        else{
            this.addToSide("left" , node);
        }
    }
    addToSide(side , node){
        if(!this[side]){
            this[side] = node;
            node.parent = this;
        }
        else{
            this[side].add(node);
        }
    }
    search(nodeData) {
        if (nodeData === this.data) {
            return this;
        }
        else {
            if(nodeData > this.data){
                return this.searchOnSide("right", nodeData);
            }
            else{
                return this.searchOnSide("left", nodeData);
            }
        }
    }
    searchOnSide(side, nodeData){
        if(this[side]){
            return this[side].search(nodeData);
        }
    }
    findParentAndUpdate(node, value){
        let parent = node.parent;
        if(parent){
            if(parent.right === node){
                parent.right = value;
            }
            else{
                parent.left = value;
            }
        }
    }
    remove(nodeData, root){
        let node = this.search(nodeData);
        let right = node.right;
        let left = node.left;
        let parent = node.parent;
        if(!right && !left){
            this.findParentAndUpdate(node, null);
        }
        else if(right && left){
            const childrenArray = right.getChildren();
            childrenArray.sort(function(a,b){
                return a.data - b.data
            });
            let replaceNode = childrenArray.find(function(element){
                return element.data > node.data
            });
            replaceNode.parent = parent;
            replaceNode.left = left;
            replaceNode.right = right;
            //fix
            if(nodeData === root.data){
                replaceNode = root;
                return
            }
            this.findParentAndUpdate(node, replaceNode);
            // if(parent.right === node){
            //     parent.right = replaceNode;
            // }
            // else{
            //     parent.left = replaceNode;
            // }
        }
        else{
            if(right){
                right.parent = parent;
                //fix
                if(nodeData === root.data){
                    replaceNode = root;
                    return
                }
                this.findParentAndUpdate(node, right);
                // if(parent.right === node){
                //     parent.right = right;
                // }
                // else{
                //     parent.left = right;
                // }
            }
            else if(left){
                left.parent = parent;
                //fix
                if(nodeData === root.data){
                    replaceNode = root;
                    return
                }
                this.findParentAndUpdate(node, left);
                // if(parent.right === node){
                //     parent.right = left;
                // }
                // else{
                //     parent.left = left;
                // }
            }
        }

    }

    getChildren(){
        let valuesArray = [this];
        let array1, array2;
        if(this.right){
            array1 = this.right.getChildren();
            valuesArray.push(...array1);
        }
        if(this.left){
            array2 = this.left.getChildren();
            valuesArray.push(...array2);
        }
        return valuesArray;
    }
}

class BinaryTree {
    constructor() {}
    add(n) {
        const node = new Node(n);
        if(this.root){
            this.root.add(node);
        }
        else{
            this.root = node;
        }
    }
    search(nodeData) {
        if (this.root) {
            return this.root.search(nodeData);
        }
        else{
            throw new Error("There is no nodes in the tree");
        }
    }
    remove(nodeData){
        if(this.root){
            this.root.remove(nodeData, this.root);
        }
        else{
            throw new Error("There is no nodes in the tree");
        }
    }
}

const myTree = new BinaryTree();
myTree.add(10);
myTree.add(12);
myTree.add(11);
myTree.add(13);
myTree.add(18);
myTree.add(15);
myTree.add(19);
myTree.add(14);

myTree.remove(10);

