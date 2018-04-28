const {UsersDb} = require('./users');
const {GroupsDb} = require('./groups');
const {Group} = require('./group');
const {User} = require('./user');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const usersDb = new UsersDb();
const groupsDb = new GroupsDb();

whatDoYouWantToDoNext();

function whatDoYouWantToDoNext(){
    rl.question('What do you want to do next?\n' +
        'Create [new user]?, [delete user]?, [print users] list?\n' +
        'update [user age]?, update [user password]?\n'+
        'Create [new group]?, [delete group]?, [print groups] list?,\n' +
        'update [group name]?, [add user to group]?, [delete user from group]?,\n' +
        'Print a [list of groups and users] under each group?, [exit]?\n', main);

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
            case 'user age':
                //....
                break;
            case 'user password':
                //
                break;
            case 'new group':
                createNewGroup();
                break;
            case 'delete group':
                deleteGroup();
                break;
            case 'print groups':
                printGroupsList();
                break;
            case 'group name':
                //
                break;
            case 'add user to group':
                getUsernameAndGroupName("add");
                break;
            case 'delete user from group':
                getUsernameAndGroupName("delete");
                break;
            case 'list of groups and users':
                printListOfGroupsAndUsersUnderEachGroup();
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

function deleteUserFromGroup(username, groupName){
    if(usersDb.isUserExists(username) && groupsDb.isGroupExists(groupName)) {
        let groupsNamesArray = groupsDb.getGroupsNamesArray();
        let groupIndex = groupsNamesArray.findIndex((group)=>{
            return group === groupName;
        });
        if(!groupsDb.groups[groupIndex].isUserExistsInGroup(username)){
            console.log('User do not exists in this group');
            whatDoYouWantToDoNext();
            return;
        }
        //let userIndex = usersDb.findUserIndex(username);
        if(groupsDb.groups[groupIndex].deleteUserFromGroup(username)){
            console.log(`${username} deleted successfully from group ${groupName}`);
            whatDoYouWantToDoNext();
            return
        }
        console.log("Something went wrong, try again");
        whatDoYouWantToDoNext();
    }
    else{
        console.log("User or group does not exist");
        whatDoYouWantToDoNext();
    }
}

function addUserToGroup(username, groupName){
    if(usersDb.isUserExists(username) && groupsDb.isGroupExists(groupName)){
         let groupsNamesArray = groupsDb.getGroupsNamesArray();
         let groupIndex = groupsNamesArray.findIndex((group)=>{
             return group === groupName;
         });
        if(groupsDb.groups[groupIndex].isUserExistsInGroup(username)){
            console.log('User already exists in this group');
            whatDoYouWantToDoNext();
            return;
        }
        let userIndex = usersDb.findUserIndex(username);
        groupsDb.groups[groupIndex].addUserToGroup(usersDb.users[userIndex]);
        console.log(`${username} added successfully to group ${groupName}`);
        whatDoYouWantToDoNext();
    }
    else{
        console.log("User or group does not exist");
        whatDoYouWantToDoNext();
    }
}

function getUsernameAndGroupName(action){
    let username, groupName;
    rl.question('Enter a [username]\n', whichGroup);
    function whichGroup(name){
        username = name;
        rl.question('Enter a [group] name\n', onFinnish);
    }
    function onFinnish(group){
        groupName = group;
        if(action === "add") {
            addUserToGroup(username, groupName);
        }
        else if(action === "delete"){
            deleteUserFromGroup(username, groupName);
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
    rl.question('enter the username you want to delete\n', (name)=>{
        if(usersDb.users.length){
            let groupsArray = groupsDb.getGroupsArray();
            groupsArray.forEach((group)=>{
                if(group.isUserExistsInGroup(name)){
                    group.deleteUserFromGroup(name);
                }
            });
            //fix the order.
            if(usersDb.deleteUser(name)){
                console.log("User deleted successfully");
                whatDoYouWantToDoNext();
                return;
            }
            console.log("User does not exist");
            whatDoYouWantToDoNext();
        }
        console.log("The list is empty");
        whatDoYouWantToDoNext();
    });
}

function printUsersList(){
    if(usersDb.users.length){
        let userNamesArray = usersDb.getUserNamesArray();
        userNamesArray.forEach((username, i)=>{
            console.log(`#${i+1} username`);
        });
        whatDoYouWantToDoNext();
        return;
    }
    console.log("The list is empty");
    whatDoYouWantToDoNext();
}

function printGroupsList(){
    if(groupsDb.groups.length){
        let groupsNamesArray = groupsDb.getGroupsNamesArray();
        groupsNamesArray.forEach((groupName, i)=>{
            console.log(`#${i+1} ${groupName}`);
        });
        whatDoYouWantToDoNext();
        return;
    }
    console.log("The list is empty");
    whatDoYouWantToDoNext();
}

function printListOfGroupsAndUsersUnderEachGroup(){
    let groupsArray = groupsDb.getGroupsArray();
    groupsArray.forEach((group)=>{
        console.log(group.name);
        group.users.forEach((user)=>{
            console.log(`\t${user.username}(${user.age})`);
        })
    });
    whatDoYouWantToDoNext();
}

function createNewGroup(){
    rl.question('Enter a name for the group\n', groupName);
    function groupName(name){
        if(groupsDb.isGroupExists(name)){
            console.log("This name already exists, choose a different name");
            createNewGroup();
            return;
        }
        groupsDb.addGroup(new Group(name, []));
        console.log("Group created successfully");
        whatDoYouWantToDoNext();
    }
}

function deleteGroup(){
    rl.question('enter the name of the group you want to delete\n', (name)=>{
        if(groupsDb.groups.length){
            if(groupsDb.deleteGroup(name)){
                console.log("Group deleted successfully");
                whatDoYouWantToDoNext();
                return;
            }
            console.log("Group does not exist");
            whatDoYouWantToDoNext();
        }
        console.log("The list is empty");
        whatDoYouWantToDoNext();
    });
}

function createNewUser(){
    let username, age, password;
    rl.question('Enter a username\n', ageQuestion);
    function ageQuestion(name){
        if(usersDb.isUserExists(name)){
            console.log("username already exist. enter a different username");
            createNewUser();
            return;
        }
        username = name;
        rl.question('what is your age?\n', passwordQuestion)
    }
    function passwordQuestion(userAge){
        age = userAge;
        rl.question('Select a password?\n', finish)
    }
    function finish(userPassword){
        password = userPassword;
        usersDb.addUser(new User(username, age, password));
        console.log("User created successfully!");
        whatDoYouWantToDoNext();
    }
}





