import { StatusCodes } from "http-status-codes";
import customErrors from "../errors/customErrors.js";

const errorHandlerMiddleware = (err, req, res, next) => { 
    if(err instanceof customErrors){
        return res.status(err.StatusCodes).json({error: err.message})
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Ops. Parece que tem algo errado com nossos servidores. Tente novamente mais tarde.")
}


export default errorHandlerMiddleware