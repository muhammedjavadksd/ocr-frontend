const { config } = require("dotenv");
const { Schema, model } = require("mongoose");

config()
const collectionName = process.env.AADHAR_SCHEMA || "AADHAR_SCHEMA"
console.log(collectionName);

const AadharInfo = new Schema({
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    aadhar_number: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
})

const AadharSchema = new model(collectionName, AadharInfo);
module.exports = AadharSchema