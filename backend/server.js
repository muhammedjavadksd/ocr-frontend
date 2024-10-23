
const express = require("express");
const app = express();
const port = process.env.PORT || 8080
const dotenv = require("dotenv");
const { notFound, errorHandle } = require("./middleware/utilMiddleware");
const userRouter = require("./router/userRouter");

dotenv.config({ path: "./.env" })

app.use("/", userRouter);

app.use("*", notFound);
app.use(errorHandle)

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})