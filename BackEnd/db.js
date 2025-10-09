const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/UserModel");
const Task = require("./models/taskModel");
dotenv.config();

const DB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.log("MongoDB connection failed");
        process.exit(1);
    }
}

module.exports = DB;