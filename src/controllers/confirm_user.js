import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"

const confirmUser = async (req, res) => {
    const { token } = req.params

   res.status(StatusCodes.OK).send("tudo certo com seu token")
}


export default confirmUser