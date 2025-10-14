const Task = require("../models/taskModel");


const CreateTask = async (req, res) => {
  try {
    const { task } = req.body;
    const userId = req.userId; 

    const newTask = new Task({
      task,
      userId,
      Done: false
    });

    await newTask.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const GetTask = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await Task.find({ userId });

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const UpdateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.Done = !task.Done;
    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "No task found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { CreateTask, GetTask, UpdateTask, DeleteTask };
