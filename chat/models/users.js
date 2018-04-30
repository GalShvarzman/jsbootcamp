function UsersDb(){
    const users = [];

    return{
        isUserExists,
        deleteUser,
        addUser,
        getUserNamesArray,
        getUsersArray,
        getUser
    };

    function findUserIndex(username){
        return users.findIndex((user)=>{
            return username === user.username;
        })
    }
    function isUserExists(username){
        let i = findUserIndex(username);
        if(i !== -1){
            return true
        }
        return false;
    }
    function deleteUser(username){
        let i = findUserIndex(username);
        if(i !== -1){
            users.splice(i, 1);
            return true;
        }
        return false;
    }
    function addUser(user){
        users.push(user);
    }
    function getUserNamesArray(){
        return users.map((user)=>{
            return user.username
        })
    }
    function getUsersArray(){
        return users;
    }
    function getUser(userName){
        return users.find((user)=>{
            return user.username === userName;
        })
    }
}


module.exports.UsersDb = UsersDb;