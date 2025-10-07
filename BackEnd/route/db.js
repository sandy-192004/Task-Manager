const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const DB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.log("MongoDB connection failed");
    }
}

module.exports = DB;