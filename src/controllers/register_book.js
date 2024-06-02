import { StatusCodes } from "http-status-codes"
import { badRequest } from "../errors/index.js"
import prisma from "../lib/prismaClient.js"


const register_books = async (req, res, next) => {
    const { books, userId} = req.body
    // if (!userId) {
    //     return next(new badRequest("Você precisa preencher todos os campos"))
    // }
    
    // if(books.length > 0 ) { 
    //     books.forEach(book => { 
    //         if( !book.name  || !book.book_id || !book.publisher) {
    //             return next(new badRequest("Você precisa preencher todos os campos"))
    //         }
    //     })
    // } 

    const editedBooks = books.map(book => { return { ...book, userId } })
    
    await prisma.books.createMany({ data: editedBooks })
    res.status(StatusCodes.OK).send("Livros cadastrados")
}

export default register_books