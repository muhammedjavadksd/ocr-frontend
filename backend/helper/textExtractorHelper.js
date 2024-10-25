const tesseract = require("tesseract.js");
const path = require("path")

async function getDataFromAadharCard(image) {


    const { data: { text } } = await tesseract.recognize(join, "eng");
    return text;

    const aadharNumberPattern = /\d{4}\s*\d{4}\s*\d{4}/;
    const genderKeywords = ['Male', 'Female', 'M', 'F'];
    const lines = frontText.split('\n').concat(backText.split("\n"))
    const addressRegex = /^([A-Za-z0-9\s,]+)$/;




    const details = {
        name: null,
        address: null,
        gender: null,
        aadharNumber: null,
    };

    lines.forEach((line, index) => {

        const nameRegex = /^([A-Za-z\s]+)$/;
        const aadharMatch = line.match(aadharNumberPattern);
        const gender = genderKeywords.find(keyword => line.includes(keyword));
        if (aadharMatch) {
            details.aadharNumber = aadharMatch[0].replace(/\s/g, '');
        } else if (gender) {
            details.gender = gender == "F" ? "Female" : "Male";
        } else if (nameRegex.test(line) && !details.name) {
            console.log(line);
            details.name = line
        } else if (addressRegex.test(line)) {
            details.address = line
        }

    })



    console.log(details);

}

function getIdNumber(text) {
    const idNumberRegex = /\n+\d{4}\s+\d{4}\s+\d{4}\s/;
    const match = text.match(idNumberRegex);
    if (match) {
        return match[0].replace(/\s/g, '');
    }
    return null;
}

function getName(text) {
    const nameRegex = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/;
    const match = text.match(nameRegex);
    return match ? match[0] : null;
}

function getGender(text) {
    const genderRegex = /MALE|FEMALE|TRANSGENDER|Male|Female/;
    const match = text.match(genderRegex);
    if (match) {
        return match[0];
    }
    return null;
}

function getDOB(text) {
    const dobRegex = /\s+(\d{2}\/\d{2}\/\d{4})/;
    const match = text.match(dobRegex);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}


module.exports = { getDataFromAadharCard, getIdNumber, getName, getGender, getDOB }