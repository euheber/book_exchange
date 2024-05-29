import { badRequest } from "../errors/index.js"

const verifyToken = async (req, res, next) => {
   next()
    
};

export default verifyToken