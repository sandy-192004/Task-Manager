const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const TaskSchema = new Schema({
    task : {
        type : String,
        required : true
    },
    userId : {
        type : String,
    },
    Done :{
        type : Boolean,
        default : false
    }
})

const Task = new mongoose.model("Task",TaskSchema);
module.exports = Task;