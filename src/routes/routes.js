import { Router } from "express";
import register_user from "../controllers/register_user.js";
import getUserInfo from "../controllers/get_user_info.js";
import register_books from "../controllers/register_book.js";
import recycled_info from "../controllers/books_recycled.js";
import confirm_user from "../controllers/confirm_user.js";
import verifyToken from "../middleware/verifyToken.js"


const router = Router()

router.post("/book", register_books)
router.post('/user', register_user)
router.get('/user/:id', getUserInfo)
router.get("/user/emailconfirm/:token", verifyToken, confirm_user)
router.get("/info", recycled_info)

export default router
