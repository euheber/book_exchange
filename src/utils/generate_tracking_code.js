import crypto from "node:crypto"
function generateRandomLetters(length) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
}

function generateRandomDigits(length) {
    const bytes = crypto.randomBytes(length);
    let digits = '';
    for (let i = 0; i < length; i++) {
        digits += (bytes[i] % 10).toString();
    }
    return digits;
}

function generateTrackingCode() {


    const prefix = generateRandomLetters(2);
    const number = generateRandomDigits(9);
    const suffix = 'BR';
    return `${prefix}${number}${suffix}`;
}

export default generateTrackingCode;
