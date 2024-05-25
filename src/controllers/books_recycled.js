import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prismaClient.js"
import sendEmail from "../utils/send_email_confirmation.js"
import jwt from "jsonwebtoken"

const get_recycled_info = async (req, res) => {
    const token = await sendEmail("euheber1@gmail.com")

    const decoded = jwt.verify(token, process.env.SECRET)

    const booksInfo = await prisma.books.count()
    res.status(StatusCodes.ACCEPTED).send(`${booksInfo}`)
}

export default get_recycled_info