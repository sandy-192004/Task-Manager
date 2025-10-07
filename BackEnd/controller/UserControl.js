const User = require("../models/UserModel");
const Task = require("../models/taskModel");
const AuthmiddleWare = require("../middleware/Authmiddleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "Sandhiya";

// create new user

const CreateUser = async(req,res) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const existingUser = await User.findOne({email : email});
        if(existingUser){
            return res.status(400).json({message : "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name : name,
            email : email,
            password : hashedPassword
        })
        await newUser.save();
        res.status(200).json({message : "User created successfully"});
    }
    catch(error){
        res.status(500).json({message : error.message});
    
    }
}


// login user
const LoginUser = async(req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const existingUser = await User.findOne({email : email});
        if(!existingUser){
            return res.status(400).json({message : "User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message : "Invalid password"});
        }
        const token = jwt.sign(
            {id: existingUser._id},
            SECRET_KEY,
        {expiresIn:"1h"})
        res.status(200).json({token})
}
catch{
    res.status(404).json({msg: error.message})
}
}


// user manager

const UserManager = async(req,res) => {
    try{
        const userId = req.userId;
        const tasks = await Task.find({userId : userId});
        res.status(200).json(tasks);
    }
    catch{
        res.status(404).json({msg: "No tasks found"})
    }
}

module.exports = {CreateUser,LoginUser,UserManager};

    