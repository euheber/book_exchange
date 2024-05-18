import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prismaClient.js"

const register_books = async (req, res) => { 
        const {books, userId} = req.body
        console.log(books, userId)
 
        const editedBooks = books.map(book => {return { ...book, userId}})

    await prisma.books.createMany({data: editedBooks})
    res.status(StatusCodes.OK).send("user registered")
}

export default register_books