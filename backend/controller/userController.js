const { getDataFromAadharCard, getName, getGender, getIdNumber, getDOB } = require("../helper/textExtractorHelper");


let userController = {

    async uploadFile(req, res) {


        const frontSide = path.join(__dirname, "./aadhar.jpeg")
        const backSide = path.join(__dirname, "./back-side.jpeg")

        const basicData = await getDataFromAadharCard(frontSide)
        const advanceData = await getDataFromAadharCard(backSide)

        console.log(advanceData);

        const name = getName(basicData)
        const gender = getGender(basicData)
        const id = getIdNumber(basicData)
        const dob = getDOB(basicData)
        console.log(name);
        console.log(gender);
        console.log(id);
        console.log(dob);

        res.send("Okay")
    }
}


module.exports = userController;