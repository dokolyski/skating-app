import { ValidateIf, IsNotEmpty, IsDate } from "class-validator"

export class DateRange {
    @ValidateIf(o => o.date_from != null)
    @IsNotEmpty()
    @IsDate()
    date_from: Date | null

    @ValidateIf(o => o.date_to != null)
    @IsNotEmpty()
    @IsDate()
    date_to: Date | null
}