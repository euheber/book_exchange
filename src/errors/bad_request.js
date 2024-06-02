import { StatusCodes } from "http-status-codes";
import { customErrors } from "./index.js"


class badRequest extends customErrors {
    constructor(message, teste) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
        this.teste = teste
    }
}


export default badRequest