import { badRequest } from "../errors/index.js"
import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prismaClient.js"

const getUserInfo = async (req, res, next) => {
    const { id } = req.params
    try {

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                name: true,
                books: { 
                    select: {
                        book_id:true,
                        name: true,
                        publisher:true
                    }
                }
            },
            
        })

        if (user != null) {
            res.status(StatusCodes.OK).json(user)
        } else {
            throw new badRequest("Usuário não encontrado.")
        }
    } catch (e) {
        next(e)
    }
}

export default getUserInfo