import customErrors from "../errors/customErrors.js";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => { 
    if(err instanceof customErrors){
        return res.status(err.statusCode).json({error: err.message, data: err.teste})
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Ops. Parece que tem algo errado com nossos servidores.")
}


export default errorHandlerMiddleware