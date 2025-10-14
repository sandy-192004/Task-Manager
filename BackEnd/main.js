const express = require("express");
const app = express();
const port = 4000;
const router = require("./route/UserRoute.js");
const route = require("./route/TaskRoute.js");
const mongoose = require("mongoose");
const DB = require("./db.js");
const cors = require("cors");
DB();


app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));




app.use("/task",route);


app.use("/user",router);


app.listen(port, (error) => {
    console.log(`server runs on http://localhost:4000`);
})