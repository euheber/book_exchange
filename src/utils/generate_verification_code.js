import {randomBytes} from "node:crypto"

const generateVerificationCode =  () => {
    
    return new Promise((resolve, reject) => {
        randomBytes(16, (err, buf) => {
            if (err) {
                
                reject(err);
            } else {
            
                resolve(buf.toString('hex'));
            }
        });
    });
}



export default generateVerificationCode