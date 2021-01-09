import {BadRequestException, ValidationError, ValidationPipe} from "@nestjs/common";

function convertValidationErrors(validationErrors: ValidationError[] )
{
    return validationErrors.map(e => {
        return {
            name: e.property,
            errors: e.constraints
        }
    });
}

export default new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(convertValidationErrors(validationErrors));
    }
})