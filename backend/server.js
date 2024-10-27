
const express = require("express");
const app = express();
const port = process.env.PORT || 8080
const dotenv = require("dotenv");
const userRouter = require("./router/userRouter");
const { notFound, errorHandle } = require("./middleware/utilMiddleware");
const mongoConnection = require("./database/connection");
const fileUpload = require("express-fileupload")
const cors = require("cors")

app.use(cors({ origin: ['http://localhost:3000'] }))


app.use(fileUpload())
dotenv.config({ path: "./.env" })
mongoConnection()

app.use("/", userRouter);

app.use("*", notFound);
app.use(errorHandle)

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})