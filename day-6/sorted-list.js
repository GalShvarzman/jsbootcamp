function SortedList(){
    this.list = [];
}

SortedList.prototype = {
    getCount(){
        return this.list.length;
    },
    add(valuesArray){
            this.list.push(...valuesArray);
            this.list.sort((a,b)=>{
                return a-b
            })
    },
    search(valueToFind){
        if(this.list.length) {
            let index = 0;
            return this.internalSearch(this.list, valueToFind, index);
        }
        else{
            throw new Error("The list is empty");
        }
    },
    internalSearch(array, valueToFind, index){
        if(array.length > 1) {
            let currentArray = new SortedList();
            let middle = Math.floor(array.length / 2);
            if (array[middle] === valueToFind) {
                return index + middle;
            }
            else if (valueToFind < array[middle]) {
                currentArray.list = array.slice(0, middle);
                return currentArray.internalSearch(currentArray.list, valueToFind, index);
            }
            else{
                index += middle;
                currentArray.list = array.slice(middle);
                return currentArray.internalSearch(currentArray.list, valueToFind, index);
            }
        }
        else{
            return -1;
        }
    },
    getList(){
        return this.list;
    }
};

main();

function main() {
    try {
        const list = new SortedList();

        function valuesToAdd(valuesAmount){
            const array = [];
            let obj = {};
            for (let i = 0; array.length < valuesAmount; i++) {
                let value = getRandomValue(valuesAmount);
                if(!obj[value]){
                    obj[value] = true;
                    array.push(value);
                }
            }
            return array;
        }

        list.add(valuesToAdd(10000));

        assert("Validating collection count", list.getCount(), 10000);

        let valueToFind = 3;
        let actualIndex = list.search(valueToFind);
        let arr = list.getList();
        let expectedIndex = arr.indexOf(valueToFind);
        assert("Validating search", actualIndex, expectedIndex);

        console.log("PASS");
    }
    catch (err) {
        console.log("FAIL: " + err.message);
    }
}

function getRandomValue(valuesAmount) {
    const value = Math.floor(Math.random() * valuesAmount);
    return value;
}

function assert(message, actual, expected) {
    if (actual != expected) {
        throw new Error(message);
    }
}