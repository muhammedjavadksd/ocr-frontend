const { getDataFromAadharCard, getName, getGender, getIdNumber, getDOB, getAddress } = require("../helper/textExtractorHelper");
const path = require("path")
const fs = require("fs")
// import { createWorker } from 'tesseract.js';
const Tesseract = require("tesseract.js")


let userController = {


    async imageFileParser(req, res, next) {

        const frontSide = fs.readFileSync(path.join(__dirname, "./aadhar.jpeg"))
        const backSide = fs.readFileSync(path.join(__dirname, "./back-side.jpeg"))

        try {
            let results = []
            const { data: { text: text1 } } = await Tesseract.recognize(frontSide, "eng");
            const { data: { text: text2 } } = await Tesseract.recognize(backSide, "eng");

            results.push(text1)
            results.push(text2)
            // results = [frontSide, backSide].map(async (each) => {
            //     return text;
            // })



            // const results = await Promise.all(promises);
            console.log(results)
            const filteredData = results.map((text) => {

                const matchName = text.match(/(?<=\n)([^\n]*)\n.*DOB:/);
                const name = matchName ? matchName[1].trim() : '';

                const matchFirstSet = text.match(/DOB: (\d{2}\/\d{2}\/\d{4})[\s\S]*?\n([^\n]*)/);
                const [, dob] = matchFirstSet || [null, null];

                const matchGender = text.match(/(?:MALE|FEMALE)/);
                const gender = matchGender ? matchGender[0] : '';

                const matchMobileNumber = text.match(/Mobile No\. (\d{10})/);
                const mobileNumber = matchMobileNumber ? matchMobileNumber[1] : null;

                const matchAadhaarNumber = text.match(/(\d{4}\s\d{4}\s\d{4})/);
                const aadhaarNumber = matchAadhaarNumber ? matchAadhaarNumber[1].replace(/\s/g, '') : null;

                // const matchSecondSet = text.match(/Address SRE[\s\S]*?C\/O:[\s\S]*?([^\n]*[\s\S]*?)(Kerala - \d{6})/);
                // const [, address, pincode] = matchSecondSet || [null, null];
                const matchAddress = text.match(/Address([\s\S]*?)(Kerala - (\d{6}))/);
                const [, address, fullPincode, pincode] = (matchAddress && matchAddress.slice(1)) || [null, null, null, null];
                console.log({ address: address ? address.trim() : null, pincode: pincode });



                return {
                    name: name,
                    dob,
                    gender,
                    mobileNumber,
                    aadhaarNumber,
                    address: address,
                    pincode,
                };
            });

            res.json({ message: filteredData });
        } catch (err) {
            console.log(err);
            res.status(500).json({ err: "Internal server error" })
        }
    },

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
        const address = getAddress(advanceData)
        console.log(name);
        console.log(gender);
        console.log(id);
        console.log(dob);
        console.log(address);

        res.send("Okay")
    }
}


module.exports = userController;