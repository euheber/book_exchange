import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prismaClient.js"


const get_recycled_info = async (req, res) => {
    
    const booksInfo = await prisma.user.findMany({select:{state:true, _count:{select:{books:true}}}})
    const editedBooksInfo = booksInfo.map(book => { return { state: book.state, recycledBooks:book._count.books}})
    res.status(StatusCodes.ACCEPTED).json(editedBooksInfo)
}

export default get_recycled_info