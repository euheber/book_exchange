import { Router } from "express";
import register_books from "../controllers/register_books.js"

const router = Router()

router.post('/books', register_books)

export default router
