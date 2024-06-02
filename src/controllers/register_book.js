import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prismaClient.js"
import { Prisma } from "@prisma/client"
import { badRequest } from "../errors/index.js"


const register_books = async (req, res, next) => {
    const { books, userId } = req.body
    const editedBooks = books.map(book => { return { ...book, userId } })

    try {
        await prisma.books.createMany({ data: editedBooks })
        res.status(StatusCodes.OK).send("Livros cadastrados")
    } catch (e) {
 
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2003") {
                next(new badRequest("Id de usuário incorreto ou não existe nos nossos banco de dados"))
            }
        }else { 
            res.status(StatusCodes.CONFLICT)
            .json({error: "Tivemos um problema durante a criação do usuário. Tente novamente mais tarde"})
        }
    }
}

export default register_books