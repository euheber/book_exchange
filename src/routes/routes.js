import register_user from "../controllers/register_user.js"
import getUserInfo from "../controllers/get_user_info.js"
import register_books from "../controllers/register_book.js"
import recycled_info from "../controllers/books_recycled.js";
import { Router } from "express";


const router = Router()

router.post('/user', register_user)
router.post("/book", register_books)
router.get('/user/:id', getUserInfo)
router.get("/info", recycled_info)
export default router
