import { Router } from "express";
import register_user from "../controllers/register_user.js";
import getUserInfo from "../controllers/get_user_info.js";
import register_books from "../controllers/register_book.js";
// import recycled_info from "../controllers/books_recycled.js";
import updateEmail from "../controllers/update_email.js";
import request_validation from "../middleware/request_validation.js";
import auth from "../middleware/auth_token.js"
import updateUserStatus from "../controllers/update_user_status.js";

const router = Router()

router.post("/book/:token", request_validation, auth, register_books)
router.post('/user', request_validation, register_user)
router.get('/user/:token', auth, getUserInfo)
// router.get("/user/info", recycled_info)
router.patch("/user/email/:token", request_validation, auth, updateEmail)
router.patch("/admin/user/status", updateUserStatus)

export default router
