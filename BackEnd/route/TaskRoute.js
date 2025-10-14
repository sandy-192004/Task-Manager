const express = require("express");
const route = express.Router();
const { CreateTask, GetTask, DeleteTask, UpdateTask } = require("../controller/TaskControll");
const AuthmiddleWare = require("../middleware/Authmiddleware");

route.post("/add", AuthmiddleWare, CreateTask);
route.get("/get", AuthmiddleWare, GetTask);
route.delete("/delete/:id", AuthmiddleWare, DeleteTask);
route.put("/update/:id", AuthmiddleWare, UpdateTask);

module.exports = route;
