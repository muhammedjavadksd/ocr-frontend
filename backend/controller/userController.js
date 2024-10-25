const AadharSchema = require("../database/models/aadhar-info");
const { getDataFromAadharCard, getName, getGender, getIdNumber, getDOB, getAddress } = require("../helper/textExtractorHelper");
const path = require("path")

async function uploadFile(req, res) {

    try {
        const frontSide = path.join(__dirname, "./aadhar.jpeg")
        const backSide = path.join(__dirname, "./back-side.jpeg")

        const basicData = await getDataFromAadharCard(frontSide)
        const advanceData = await getDataFromAadharCard(backSide)

        const name = getName(basicData)
        const gender = getGender(basicData)
        const id = getIdNumber(basicData)
        const dob = getDOB(basicData)
        const address = getAddress(advanceData)

        await new AadharSchema({ name, gender, dob, aadhar_number: id, address }).save()

        res.status(200).json({
            status: true,
            data: {
                name,
                gender,
                aadhar_number: id,
                dob,
                address
            }
        })
    } catch (e) {
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }

}



module.exports = uploadFile;