import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prismaClient.js"
import { Prisma } from "@prisma/client"
import { badRequest } from "../errors/index.js"
import {validationResult} from "express-validator"

const register_books = async (req, res, next) => {
    const { books, decodedToken } = req.body
    const result = validationResult(req)
    if(result.isEmpty()){ 
        const editedBooks = books.map(book => { return { ...book, userId: decodedToken.id } })

        try {
            if (editedBooks.length > 1) {
                await prisma.books.createMany({ data: editedBooks })
    
            } else {
                await prisma.books.create({ data: editedBooks[0] })
            }
    
          return  res.status(StatusCodes.OK).json({ msg: "Livro(s) cadastrados com sucesso" })
        } catch (e) {
    
            if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2003") {
               return next(new badRequest("Id de usuário incorreto ou não existe"))
            }
        }
    }


    res.status(StatusCodes.BAD_REQUEST).send(result)
    
}

export default register_books