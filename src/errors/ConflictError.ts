import { BaseError } from "./BaseError";

export class ConflictError extends BaseError{
    constructor(
        message: string = "Solicitação atual conflitou com o recurso. "
    ) {
        super(409, message)
    }
}