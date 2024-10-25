

const express = require("express");
const userRouter = express.Router()
const uploadFile = require("../controller/userController")

userRouter.post("/upload-file", uploadFile);

module.exports = userRouter