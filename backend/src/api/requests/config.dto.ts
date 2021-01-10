import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class ConfigRequest {

    @IsNotEmpty()
    @IsString()
    key: number;

    @IsNotEmpty()
    @IsString()
    value: string;
}

export class ConfigEditRequest extends ConfigRequest {

    @IsNotEmpty()
    @IsNumber()
    id: number;
}

