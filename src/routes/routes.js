import register_books from "../controllers/register_books.js"
import getRecycleInfo from "../controllers/get-recycle-info.js"
import { Router } from "express";

const router = Router()

router.post('/books', register_books)
router.get('/book/:id', getRecycleInfo)


export default router
