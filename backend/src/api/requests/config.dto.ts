import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class ConfigRequest {

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    key: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    value: string;
}

