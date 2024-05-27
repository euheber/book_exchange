import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"

const confirmUser = async (req, res) => {
    const { token } = req.params
    console.log(token)
    jwt.verify(token, process.env.SECRET, (error, info) => { 
        if(error) {
            console.log(error)
            res.status(StatusCodes.BAD_REQUEST).send("parece que seu token está inválido")
        } else { 
            console.log(info)
            res.status(StatusCodes.OK).send(`${info.data}`)
        }
    })
    
}


export default confirmUser