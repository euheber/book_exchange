import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prismaClient.js"
import { Prisma } from "@prisma/client"
import { badRequest } from "../errors/index.js"


const register_books = async (req, res, next) => {
    const { books, decodedToken, token } = req.body
    const editedBooks = books.map(book => { return { ...book, userId: decodedToken.id } })
    console.log(token)
    try {
        if (editedBooks.length > 1) {
            await prisma.books.createMany({ data: editedBooks })
            await prisma.invalidTokens.create({ data: { token } })

        } else {
            await prisma.books.create({ data: editedBooks[0] })
        }

        res.status(StatusCodes.OK).json({ msg: "Livros cadastrados com sucesso", code: `Você pode acompanhar o status do seu pedido com esse código ou acessando seus dados via ID de usuário` })
    } catch (e) {

        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2003") {
            next(new badRequest("Id de usuário incorreto ou não existe"))
        }

        
    }
}

export default register_books