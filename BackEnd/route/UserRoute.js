const express = require("express");
const router = express.Router();
const { CreateUser, LoginUser, UserManager } = require("../controller/UserControl");
const AuthmiddleWare = require("../middleware/Authmiddleware");

router.post("/signup", CreateUser);
router.post("/login", LoginUser);
router.get("/task", AuthmiddleWare, UserManager);

module.exports = router;
