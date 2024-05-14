import prisma from "../lib/prismaClient.js"
import { StatusCodes } from "http-status-codes"

const getRecycleInfo = async (req, res) => {
    const { id } = req.params

    const user = await prisma.user.findUnique({ where: { id } })

    res.status(StatusCodes.OK).send(user)
}

export default getRecycleInfo