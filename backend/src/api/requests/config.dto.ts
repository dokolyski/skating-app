import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class ConfigRequest {

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    key: string;

    @IsNotEmpty({message: "REQUIRED"})
    @IsString({message: "MUST_BE_STRING"})
    value: string;
}

export class ConfigEditRequest extends ConfigRequest {

    @IsNotEmpty({message: "REQUIRED"})
    @IsNumber({}, {message:"MUST_BE_NUMBER"})
    id: number;
}

