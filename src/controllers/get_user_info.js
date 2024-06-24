import { badRequest } from "../errors/index.js"
import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prismaClient.js"

const getUserInfo = async (req, res, next) => {
    const { tracking_code } = req.body
    try {

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
            throw new badRequest("Usuário não encontrado.")
        }
    } catch (e) {
        next(e)
    }
}

export default getUserInfo