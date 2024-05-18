import register_user from "../controllers/register_user.js"
import getUserInfo from "../controllers/get_user_info.js"
import register_books from "../controllers/register_user.js";
import { Router } from "express";


const router = Router()

router.post('/user', register_user)
router.get('/user/:id', getUserInfo)
router.post("/book", register_books)

export default router
