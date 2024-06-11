import { Router } from "express";
import register_user from "../controllers/register_user.js";
import getUserInfo from "../controllers/get_user_info.js";
import register_books from "../controllers/register_book.js";
import recycled_info from "../controllers/books_recycled.js";
import confirm_user from "../controllers/confirm_user.js";
import request_validation from "../middleware/request_validation.js";
import auth from "../middleware/auth_token.js"

const router = Router()

router.post("/book", request_validation, register_books)
router.post('/user', request_validation, register_user)
router.patch("/user/email/confirm", request_validation, confirm_user)
router.get('/user/:token', auth,  getUserInfo)
router.get("/user/info", recycled_info)

export default router
