function User(username, age, password){
    this.username = username;
    this.setAge(age);
    this.setPassword(password);
}

User.prototype = {
    setPassword : function(password){
        this.password = password;
    },
    setAge : function(age){
        this.age = age;
    }
};

module.exports.User = User;