class Node{
    constructor(value){
        this.data = value;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    add(n){
        const node = new Node(n);
        if(this.length){
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        else{
            this.head = node;
            this.tail = node;
        }
        this.length ++;
        return node;
    }
    search(position){
        if(this.length && position < this.length){
            let current = this.head;
            const moves = position -1;
            for(let i = 0; i !== moves; i++){
                current = current.next;
            }
            return current;
        }
        else{
            throw new Error("The list is empty or the node do not exist");
        }
    }
    remove(position){
        try{
            const node = this.search(position);
            const next = node.next;
            const prev = node.prev;

            next.prev = prev;
            prev.next = next;

            this.length--;
            return this;
        }
        catch(err){
            throw new Error("Can not remove node because the list is empty or the node do not exist");
        }
    }
    getList(){
        let current = this.head;
        const listArray = [current.data];
        for(let i = 1; i < this.length; i++){
            current = current.next;
            listArray.push(current.data);
        }
        return listArray;
    }
}