import { badRequest } from "../errors/index.js"
import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prismaClient.js"
import { validationResult } from "express-validator"
const getUserInfo = async (req, res, next) => {

    const result = validationResult(req)
    
    if (!result.isEmpty()) {
        
        return next(new badRequest("You need to provaide the tracking code", result))
    }
    

    const { tracking_code } = req.body
   
        const user = await prisma.user.findUnique({
            where: { tracking_code },
            select: {
                id: true,
                name: true,
                books: true
            },

        })

        if (user != null) {
            res.status(StatusCodes.OK).json(user)
        } else {
            return next(new badRequest("Usuário não encontrado.")) 
        }
   
}

export default getUserInfo