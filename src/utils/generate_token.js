import jwt from "jsonwebtoken";

const generateToken = (name, email) => {
    console.log(name, email)
    const payload = { name, email };
    const secretKey = process.env.SECRET;
    const options = { expiresIn: '24h' };
    return new Promise((resolve, reject) => {


        jwt.sign(payload, secretKey, options, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}



export default generateToken