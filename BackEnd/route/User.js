const express = require('express');
const router = express.Router();
const User = require("../models/UserModel");
const Task = require("../models/taskModel");
const {CreateUser,LoginUser,UserManager} = require("../controller/UserController");
const AuthmiddleWare = require("../middleware/Authmiddleware")

// create new user 

router.post("/signup",CreateUser);
router.post("/login",LoginUser);
router.get("/dashboard",AuthmiddleWare,UserManager);


module.exports = router;