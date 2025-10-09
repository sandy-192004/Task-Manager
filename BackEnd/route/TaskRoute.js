const express = require("express");
const route = express.Router();
const {CreateTask,GetTask,DeleteTask,UpdateTask} = require("../controller/TaskControll");

route.post("/add",CreateTask);
route.get("/get",GetTask);
route.delete("/delete/:id",DeleteTask);
route.put("/update/:id",UpdateTask);

module.exports = route;