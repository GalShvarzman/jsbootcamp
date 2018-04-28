function GroupsDb(groups){
    this.groups = groups || [];
}

GroupsDb.prototype = {
    findGroupIndex : function(groupName){
        return this.groups.findIndex((group)=>{
            return groupName === group.name;
        })
    },
    isGroupExists : function(groupName){
        let i = this.findGroupIndex(groupName);
        if(i !== -1){
            return true
        }
        return false;
    },
    deleteGroup : function(groupName){
        let i = this.findGroupIndex(groupName);
        if(i !== -1){
            this.groups.splice(i, 1);
            return true;
        }
        return false;
    },
    addGroup : function(group){
        this.groups.push(group);
    },
    getGroupsNamesArray : function(){
        return this.groups.map((group)=>{
            return group.name
        })
    },
    getGroupsArray(){
        return this.groups;
    },
    // getUsersInGroupsArray(){
    //     return this.groups.forEach((group)=>{
    //         return group.users;
    //     })
    // }
};

module.exports.GroupsDb = GroupsDb;