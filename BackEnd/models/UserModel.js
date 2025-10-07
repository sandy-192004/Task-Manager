const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const UserSchema = new Schema({
    name  : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique : true
        
    },
    password : {
        type : String,
        required : true,
        unique : true
    }
})

const User = new mongoose.model("User",UserSchema);
module.exports = User;  