const tesseract = require("tesseract.js");

async function getDataFromAadharCard(image) {

    const { data: { text } } = await tesseract.recognize(image, "eng");
    return text;
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
function getAddress(text) {
    const addressPattern = /(?:\w\/\d:\s*|Address\s*:\s*|W\/0:\s*)(.*?)(\w{2,}\s*-\s*\d{6})/s;

    const addressMatch = text.match(addressPattern);

    if (addressMatch) {
        // Clean the address part by removing unwanted characters
        const address = addressMatch[1]
            .replace(/[^a-zA-Z0-9\s,.'-]/g, '') // Remove unwanted characters
            .replace(/\s+/g, ' ') // Collapse multiple spaces
            .trim(); // Trim leading/trailing spaces

        const statePostalCode = addressMatch[2].trim(); // Extract and clean state and postal code
        return `${address}, ${statePostalCode}`; // Return formatted address
    } else {
        return 'Address not found'; // Handle case where no address is found
    }
}



module.exports = { getDataFromAadharCard, getIdNumber, getName, getGender, getDOB, getAddress }