const { default: mongoose } = require("mongoose")

function mongoConnection() {
    const mongoUrl = process.env.MONGO_URL
    if (mongoUrl) {
        mongoose.connect(mongoUrl).then(() => {
            console.log("Mongodb connection success");
        }).catch((err) => {
            console.log(err);
            console.log("mongodb connection failed");
        })
    } else {
        throw new Error("Mongo connection url not found")
    }
}



module.exports = mongoConnection