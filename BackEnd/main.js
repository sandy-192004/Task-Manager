const express = require("express");
const app = express();
const port = 4000;
const router = require("./route/User");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/",router);


app.listen(port, () => {
    console.log(`server runs on http://localhost:4000`);
})