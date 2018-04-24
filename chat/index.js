const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var usersArray = [];

whatDoYouWantToDoNext();

function whatDoYouWantToDoNext(){
    rl.question('What do you want to do next?\n' +
        'Create [new user]?, [delete user]?, [print users] list?\n' +
        'Create [new group]?, [delete group]?, [print groups] list?, [exit]?\n', main);

    function main(answer){
        switch (answer) {
            case 'new user':
                createNewUser();
                break;
            case 'delete user':
                deleteUser();
                break;
            case 'print users':
                printUsersList();
                break;
            case 'new group':
                console.log('e');
                break;
            case 'delete group':
                console.log("dd");
                break;
            case 'print groups':
                console.log("ff");
                break;
            case 'exit':
                exitChat();
                break;
            default:
                console.log('We did not understand your request');
                whatDoYouWantToDoNext();
                break;
        }
    }
}

function exitChat(){
    rl.question('Are you sure you want to exit? [y]es / [n]o\n', (answer)=>{
        if(answer === 'y'){
            rl.close();
        }
        else if(answer === 'n'){
            console.log("We're glad you stayed with us");
            whatDoYouWantToDoNext();
        }
    });
}

function deleteUser(){
    rl.question('enter the username you want to delete\n', userToDelete);

    function userToDelete(username){
        if(usersArray.length) {
            for (var i = 0; i < usersArray.length; i++) {
                if (usersArray[i].username === username) {
                    usersArray.splice(i, 1);
                    console.log("User deleted successfully");
                    whatDoYouWantToDoNext();
                    break;
                }
                else{
                    console.log("User does not exist");
                    whatDoYouWantToDoNext();
                }
            }
        }
        else{
            console.log("Users list is empty");
            whatDoYouWantToDoNext();
        }
    }
}

function printUsersList(){
    if(usersArray.length){
        var n = 1;
        usersArray.forEach((user)=>{
            console.log(`#${n}, username: ${user.username}, age: ${user.age}`);
            n++
        });
        whatDoYouWantToDoNext();
    }
    else{
        console.log("The list is empty");
        whatDoYouWantToDoNext();
    }
}

function createNewUser(){
    var username, age, password;
    rl.question('Enter a username\n', ageQuestion);

    function ageQuestion(answer){
        username = answer;
        rl.question('what is your age?\n', passwordQuestion)
    }

    function passwordQuestion(answer){
        age = answer;
        rl.question('Select a password?\n', finish)
    }

    function finish(answer){
        password = answer;
        var user = {
            'username' : username,
            'age' : age,
            'password' : password
        };
        usersArray.push(user);
        console.log("User created successfully!");
        whatDoYouWantToDoNext();
    }
}

