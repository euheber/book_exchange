import { Router } from "express";
import auth from "../middleware/auth_token.js"
import register_user from "../controllers/register_user.js";
import getUserInfo from "../controllers/get_user_info.js";
import register_books from "../controllers/register_book.js";
import getRecycledInfo from "../controllers/books_recycled.js";
import updateEmail from "../controllers/update_email.js";
import updateUserStatus from "../controllers/update_user_status.js";
import { checkSchema } from "express-validator";
import { registerBooksSchema } from "../schemas/register-books-schemas.js";
import { registerUserSchema } from "../schemas/register-user-schema.js";
import { updateUserEmailSchema } from "../schemas/update-user-email-schema.js"
import { getUserInfoSchema } from "../schemas/get-user-info-schema.js";
import { updateUserStatusSchema} from  "../schemas/update-user-status-schema.js"

const router = Router()

router.post('/user', checkSchema(registerUserSchema, ['body']), register_user) //*ok
router.post("/book", checkSchema(registerBooksSchema, ['body']), auth, register_books)  //*ok
router.patch("/user/email", checkSchema(updateUserEmailSchema, [ "body"]), auth, updateEmail)  //*ok
router.patch("/admin/user/status", checkSchema(updateUserStatusSchema, ['body']), updateUserStatus) //* ok
router.get('/user', checkSchema(getUserInfoSchema, ['body']), getUserInfo)  //*ok
router.get("/recycled/books", getRecycledInfo) //* ok
router.get("/frontend", ( req, res) => { res.send("rota de teste para o front")}) //! rotade teste

export default router
