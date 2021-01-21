import {BadRequestException, ValidationError, ValidationPipe} from "@nestjs/common";
import {RestError} from "./api/rest-error";

function convertValidationErrors(validationErrors: ValidationError[]): RestError {
    let tokens = {};

    validationErrors.forEach(e => {
        tokens[e.property] = Object.values(e.constraints)[0]
    })

    return {
        messageToken: "BAD_REQUEST",
        inputsTokens: tokens
    }
}

export default new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(convertValidationErrors(validationErrors));
    }
})