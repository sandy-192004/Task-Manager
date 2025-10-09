const Task = require("../models/taskModel");

// create new task

const CreateTask = async(req,res) => {
    try{
        const task = req.body.task;
        const userId = req.body.userId;
        const newTask = new Task({
            task ,
            userId 
         })
         await newTask.save()
         res.status(200).json("Task created successfully")
    }
    catch(error){
        res.status(500).json({"error in creating task": error.message})
    }
}

//get all task

const GetTask = (req,res) => {
    try{
        const userId = req.body.userId;
        const Done = req.body.Done
        const tasks = Task.find({userId,Done});
        if(!tasks){
            res.status(400).json({msg:"No Tasks listed"})
        }
        res.status(200).json(tasks)
    }
    catch(error){
        res.status(400).json({msg:error.message});
    }
}

//update by userid

const UpdateTask = async(req,res) => {
    try{
        const userId = req.body.userId;
        const id = req.params.id;
        const task = Task.findById(userId);
        if(!task){
            res.status(400).json({msg:"No Task found"})
        }
        task.Done = !task.Done
        await task.save()
        res.status(200).json({msg:"Task updated successfully"})
    }
    catch(error){
        res.status(400).json({msg:error.message})
}

}

//delete by userId 

const DeleteTask = (req,res) => {
    try{
        const userId = req.body.userId;
        const task = Task.findByIdAndDelete(userId);
        if(!task){
            res.json(404).json({msg:"no task found"})
        }
        res.status(200).json({msg:"Task deleted successfully"})
    }
    catch(error){
        res.status(400).json({msg: " error.message"});
    }
}

module.exports = {CreateTask,GetTask,UpdateTask,DeleteTask};