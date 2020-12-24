import { IsBoolean, IsNotEmpty } from "class-validator";

export class SendFullInfo {
    @IsNotEmpty()
    @IsBoolean()
    full: boolean
}