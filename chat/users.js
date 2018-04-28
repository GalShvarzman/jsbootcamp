function UsersDb(users){
    this.users = users || [];
}

UsersDb.prototype = {
    findUserIndex : function(username){
            return this.users.findIndex((user)=>{
                return username === user.username;
            })
    },
    isUserExists : function(username){
        let i = this.findUserIndex(username);
        if(i !== -1){
            return true
        }
        return false;
    },
    deleteUser : function(username){
        let i = this.findUserIndex(username);
        if(i !== -1){
            this.users.splice(i, 1);
            return true;
        }
        return false;
    },
    addUser : function(user){
        this.users.push(user);
    },
    getUserNamesArray : function(){
        this.users.map((user)=>{
            return user.username
        })
    }
};

module.exports.UsersDb = UsersDb;