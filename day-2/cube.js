function getLetterOrNumber(array) {
    return array[Math.floor(Math.random() * array.length)]
}

var optionsArray = ["a", "b", "c", 1, 2, 3];

getLetterOrNumber(optionsArray);