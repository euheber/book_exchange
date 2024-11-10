import jwt from "jsonwebtoken"
import prisma from "../lib/prismaClient.js"
import { badRequest } from "../errors/index.js"

const auth = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return next(new badRequest("Forneça um token válido"))
    }
    const isTokenInvalid = await prisma.invalidTokens.findUnique({ where: { token } })
  
    if (isTokenInvalid) {
        return next(new badRequest("Token already used in our bases"))
    }
    
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
        if (err) {

            if (err.name === 'TokenExpiredError') {
              return next(new badRequest("Token expired"))
            } else if (err.name === 'JsonWebTokenError') {
              return next(new badRequest("Invalid token"))
            }
        } else {

            req.body.decodedToken = decodedToken

            next()
        }
    })
}


export default auth