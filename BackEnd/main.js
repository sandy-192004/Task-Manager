const express = require("express");
const app = express();
const port = 4000;
const router = require("./route/UserRoute.js");
const route = require("./route/TaskRoute.js");
const mongoose = require("mongoose");
const DB = require("./db.js");
DB();


app.use(express.json());


app.use("/task",route);


app.use("/user",router);


app.listen(port, () => {
    console.log(`server runs on http://localhost:4000`);
})