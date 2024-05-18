import { StatusCodes } from "http-status-codes"

const get_recycled_info = async (req, res) => {
    res.status(StatusCodes.ACCEPTED).send("aqui estão as nossas informações de reciclagem")
}

export default get_recycled_info