const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  Done: {
    type: Boolean,
    default: false
  }
})

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
