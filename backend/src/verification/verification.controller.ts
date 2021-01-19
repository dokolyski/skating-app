import {Body, Controller, Post, Res} from '@nestjs/common';
import {VerificationService} from "./verification.service";
import {LoginRequest} from "../api/requests/login.dto";
import {LoginResponse} from "../api/responses/login.dto";
import {Response} from "express";

@Controller('verification')
export class VerificationController {
    constructor(private verificationService: VerificationService) {

    }

    @Post()
    async login(@Body() loginRequest: LoginRequest, @Res({ passthrough: true }) res: Response): Promise<LoginResponse> {

        const response = await this.verificationService.login(loginRequest);

        let options = {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true
        }

        res.cookie('secure-token', response.token, options);
        return Promise.resolve(response);
    }

}
