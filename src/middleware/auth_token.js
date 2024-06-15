import jwt from "jsonwebtoken"
import { badRequest } from "../errors/index.js"
const auth = (req, res, next) => {
    const { token } = req.params
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        if (err) {

            if (err.name === 'TokenExpiredError') {
                next(new badRequest("Token expirado"))
            } else if (err.name === 'JsonWebTokenError') {
                next(new badRequest("Token inválido"))
            }
        } else {
            req.body.decodedToken = decodedToken
            next()
        }
    })
}


export default auth