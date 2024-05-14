import { StatusCodes } from "http-status-codes";
import customErrors from "./customErrors.js";

class badRequest extends customErrors { 
    constructor(message){ 
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}


export default badRequest