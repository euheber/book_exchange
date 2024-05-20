import { Prisma } from "@prisma/client"
import { badRequest } from "../errors/index.js"
import prisma from "../lib/prismaClient.js"

async function register_books(req, res, next) {
    const { name, email, tracking_code } = req.body
    if(!name || !email || !tracking_code){
       return next(new badRequest("Você precisa preencher todos os campos"))
    }
    try {
        const user = await prisma.user.create({ data: { name, email, tracking_code } })

        res.status(200).send(`Aqui está o seu id: ${user.id}. Não perca este identificador ou não conseguirá ter acesso aos seus dados na nossa plataforma`)
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return next(new badRequest('Usuário já cadastrado'))
            }
        }
    }
}

export default register_books