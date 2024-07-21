import { StatusCodes } from "http-status-codes";
import { customErrors } from "./index.js"


class badRequest extends customErrors {
    constructor(message, error) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
        this.issues = error
    }
}


export default badRequest