function Group(name, users){
    this.setName(name);
    this.users = users || [];
}

Group.prototype = {
    setName : function(name){
        this.name = name;
    },
    findUserInGroupIndex : function(username){
        return this.users.findIndex((user)=>{
            return username === user.username;
        })
    },
    isUserExistsInGroup : function(username){
        let i = this.findUserInGroupIndex(username);
        if(i !== -1){
            return true;
        }
        return false;
    },
    addUserToGroup : function (user) {
        this.users.push(user);
    },
    deleteUserFromGroup : function (user) {
        let i = this.findUserInGroupIndex(user);
        if(i !== -1){
            this.users.splice(i, 1);
            return true;
        }
        return false;
    }
};

module.exports.Group = Group;
