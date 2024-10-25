const { Schema, model } = require("mongoose");


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

const AadharSchema = new model(process.env.AADHAR_SCHEMA, AadharInfo);
module.exports = AadharSchema