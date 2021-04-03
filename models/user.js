var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var userSchema = new mongoose.Schema({
    created: {type: Date, default: Date.now},
    username: String,
    password: String,
    savedColors: []
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);