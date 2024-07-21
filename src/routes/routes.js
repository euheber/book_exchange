import { Router } from "express";
import auth from "../middleware/auth_token.js"
import register_user from "../controllers/register_user.js";
import getUserInfo from "../controllers/get_user_info.js";
import register_books from "../controllers/register_book.js";
// import recycled_info from "../controllers/books_recycled.js";
import updateEmail from "../controllers/update_email.js";
import updateUserStatus from "../controllers/update_user_status.js";
import { checkSchema } from "express-validator";
import { registerBooksSchema } from "../schemas/register-books-schemas.js";
import { registerUserSchema } from "../schemas/register-user-schema.js";
import { updateUserEmailSchema } from "../schemas/update-user-email-schema.js"
import { getUserInfoSchema } from "../schemas/get-user-info-schema.js";
import { updateUserStatusSchema} from  "../schemas/update-user-status-schema.js"
const router = Router()

router.post('/user', checkSchema(registerUserSchema, ['body']), register_user)
router.post("/book/:token", checkSchema(registerBooksSchema, ['body']), auth, register_books)
router.patch("/user/email/:token", checkSchema(updateUserEmailSchema, ['body', 'params']), auth, updateEmail)
router.patch("/admin/user/status", checkSchema(updateUserStatusSchema, ['body']), updateUserStatus)
router.get('/user/:token',  checkSchema(getUserInfoSchema, ['params']), auth, getUserInfo)
// router.get("/user/info", recycled_info)

export default router
