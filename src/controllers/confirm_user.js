import { StatusCodes } from "http-status-codes"

const confirmUser = async (req, res) => {
    const { token } = req.params

   res.status(StatusCodes.OK).send("tudo certo com seu token")
}


export default confirmUser