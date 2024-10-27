const AadharSchema = require("../database/models/aadhar-info");
const { getDataFromAadharCard, getName, getGender, getIdNumber, getDOB, getAddress } = require("../helper/textExtractorHelper");
const path = require("path")

async function uploadFile(req, res) {

    try {


        console.log(req.files);
        const frontSide = req.files['front']?.data
        const backSide = req.files['back']?.data

        console.log(frontSide);
        console.log(backSide);


        const basicData = await getDataFromAadharCard(frontSide)
        console.log(basicData);

        const advanceData = await getDataFromAadharCard(backSide)


        console.log(advanceData);

        const name = getName(basicData)
        const gender = getGender(basicData)
        const id = getIdNumber(basicData)
        const dob = getDOB(basicData)
        const address = getAddress(advanceData)

        if (!id || !name || !dob) {
            res.status(400).json({ status: false, msg: "Please provide valid aadhar card" })
        } else {
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
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }

}



module.exports = uploadFile;