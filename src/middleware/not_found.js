import { StatusCodes } from "http-status-codes"

const notFound = (req, res) => { 
    res.status(StatusCodes.NOT_FOUND).send("Rota não existe")
}

export default notFound