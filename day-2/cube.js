function getRandomInt(number) {
    return Math.floor(Math.random() * Math.floor(number));
}

getRandomInt(6);

function getLetter() {
    var text = "";
    var possible = "abcdef";
    for (var i = 0; i < 1; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

getLetter();