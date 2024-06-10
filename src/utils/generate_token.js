import jwt from "jsonwebtoken";

const generateToken = (payload) => {
    const secretKey = process.env.SECRET;
    const options = { expiresIn: '1h' };
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