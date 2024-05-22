import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prismaClient.js"

const get_recycled_info = async (req, res) => {
    const booksInfo = await prisma.books.count()
    res.status(StatusCodes.ACCEPTED).send(`${booksInfo}`)
}

export default get_recycled_info