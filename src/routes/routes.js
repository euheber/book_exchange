import register_books from "../controllers/register_books.js"
import getUserInfo from "../controllers/get_user_info.js"
import { Router } from "express";

const router = Router()

router.post('/books', register_books)
router.get('/book/:id', getUserInfo)


export default router
