

const express = require("express");
const userRouter = express.Router()
const uploadFile = require("../controller/userController")
const multer = require("multer");
// const data = multer().fields([{ name: 'front', maxCount: 1 }, { name: 'back', maxCount: 1 }]);

userRouter.post("/upload-file", uploadFile);

module.exports = userRouter