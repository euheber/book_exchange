import { StatusCodes } from "http-status-codes"
import prisma from "../lib/prismaClient.js"
import { Prisma } from "@prisma/client"
import { badRequest } from "../errors/index.js"
import { validationResult } from "express-validator"

const register_books = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return next(new badRequest("You have to provide the right information on all fields", result));
    }

    const { books, decodedToken } = req.body;
    const editedBooks = books.map(book => { return { ...book, userId: decodedToken.id } });

    try {
        if (editedBooks.length > 1) {
            await prisma.books.createMany({ data: editedBooks });
        } else {
            await prisma.books.create({ data: editedBooks[0] });
        }
        await prisma.invalidTokens.create({ data: { token } });
        return res.redirect("/frontend")
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2003") {
            return next(new badRequest("Id de usuário incorreto ou não existe"));
        }
        return next(new Error(e));
    }
};


export default register_books