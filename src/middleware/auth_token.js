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
        return next(new badRequest("Token expirado ou inválido"))
    }
    
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
        if (err) {

            if (err.name === 'TokenExpiredError') {
                next(new badRequest("Token expirado"))
            } else if (err.name === 'JsonWebTokenError') {
                next(new badRequest("Token inválido"))
            }
        } else {
            // await prisma.invalidTokens.create({ data: { token } })
            req.body.decodedToken = decodedToken
            
            next()
        }
    })
}


export default auth