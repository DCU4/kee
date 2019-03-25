var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var keeSchema = new mongoose.Schema({
    image: String,
    description: String,
    created: {type: Date, default: Date.now},
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

keeSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Kee', keeSchema);


