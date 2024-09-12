class MyNode<T>{
    value: T;
    next: MyNode<T>;
    constructor(v:T){
        this.value = v;
        this.next = {} as MyNode<T>;
    }
}

class Queue<T>{
    length: number;
    head: MyNode<T>;
    tail: MyNode<T>;
    constructor(){
        this.head = {} as MyNode<T>;
        this.tail = {} as MyNode<T>;
        this.length = 0;
    }

    isEmpty():boolean{
        return (this.length === 0);
    }

    add(node:MyNode<T>){
        if( ! this.isEmpty()){
            this.tail.next = node;
        } else {
            this.head = node;                     
        }   
        this.tail = node;
        ++ this.length;
    }

    remove():MyNode<T>{
        let removed_node = {} as MyNode<T>;
        if (! this.isEmpty()){
            removed_node = this.head;
            this.head = this.head.next;
            -- this.length;           
        }
        return removed_node;
    }     

    print(){
        let current_node = this.head;
        while(Object.keys(current_node).length != 0){ //Object is not empty
           console.log((current_node.value)+ ", ");
            current_node = current_node.next;
        }
    }
}

export{
    MyNode, Queue
}