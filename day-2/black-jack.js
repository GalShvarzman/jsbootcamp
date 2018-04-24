const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function play(previousResultArray){
    rl.question('[h]it, [s]tand or [q]uit?\n', (answer) => {
        if(answer == "h"){
            var currentResult = Math.floor((Math.random() * 13) + 1);
            previousResultArray.push(currentResult);
            var sum = 0;
            previousResultArray.forEach((result)=>{
                sum += result;
            });
            if(sum === 21){
                console.log(`Result: ${sum}, Blackjack! Let's play again!`);
                play([]);
                return;
            }
            else if(sum > 21){
                console.log(`Result: ${sum}\nBurned! Let's try again!`);
                play([]);
                return;
            }
            console.log(`Result: ${sum}`);
            play(previousResultArray);
        }
        else if(answer == "s"){
            console.log("Let's play again!");
            play([]);
        }
        else if(answer == "q"){
            console.log("Thanks for playing!");
            rl.close();
        }
    });
}

play([]);









