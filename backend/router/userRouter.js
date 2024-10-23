

const express = require("express");
const userController = require("../controller/userController");
const userRouter = express.Router()


userRouter.post("/upload-file", userController.uploadFile);

module.exports = userRouter