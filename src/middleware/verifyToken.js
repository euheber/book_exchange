import { badRequest } from "../errors/index.js"

const verifyToken = async (req, res, next) => {
    const { token } = req.params;
        jwt.verify(token, process.env.SECRET, (error, info) => { 
            if(error) {
                next(new badRequest("token inválido"))
            } else { 
                next()
            }
        })

    
};

export default verifyToken