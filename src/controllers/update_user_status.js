import prisma from "../lib/prismaClient.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { badRequest } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

async function updateUserStatus(req, res, next) {
    const { tracking_code, user_state } = req.body
    try {
        prisma.user.update({
            where: {
                tracking_code
            },
            data: {
                status: user_state
            }
        })

        res.status(StatusCodes.OK).json({ msg: "Usuário atualizado com sucesso." })
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            return next(new badRequest("Código de rastreio incorreto ou inexistente"))
        }

        return next(new Error(e))
    }
}



export default updateUserStatus