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
router.post("/book", checkSchema(registerBooksSchema, ['body', 'headers']),auth, register_books) 
router.patch("/user/email", checkSchema(updateUserEmailSchema, ["body", "headers"]), updateEmail) 
router.patch("/admin/user/status", checkSchema(updateUserStatusSchema, ['body']), updateUserStatus)
router.get('/user', checkSchema(getUserInfoSchema, ['body']), getUserInfo) 

router.get("/frontend", (req, res) => { res.send("rota de teste para o front")})
// router.get("/user/info", recycled_info)

export default router
