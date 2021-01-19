import {Body, Controller, Delete, Post, Res} from '@nestjs/common';
import {VerificationService} from "./verification.service";
import {LoginRequest} from "../api/requests/login.dto";
import {LoginResponse} from "../api/responses/login.dto";
import {Response} from "express";

@Controller('verification')
export class VerificationController {
    constructor(private veryficationService: VerificationService) {

    }

    @Post()
    async login(@Body() loginRequest: LoginRequest, @Res({passthrough: true}) res: Response): Promise<LoginResponse> {

        const response = await this.veryficationService.login(loginRequest);


        res.cookie('secure-token', response.token, this.getCookieOptions());
        return Promise.resolve(response);
    }

    @Delete()
    async logout(@Res({passthrough: true}) res: Response): Promise<void> {
        const response = await this.veryficationService.logout();

        res.clearCookie('secure-token', this.getCookieOptions())

        return response
    }

    getCookieOptions() {
        return {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true
        }
    }
}
