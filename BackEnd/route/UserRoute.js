const express = require('express');
const router = express.Router();
const User = require("../models/UserModel");
const Task = require("../models/taskModel");
const {CreateUser,LoginUser,UserManager} = require("../controller/UserControl");


// create new user 

router.post("/signup",CreateUser);
router.post("/login",LoginUser);



module.exports = router;