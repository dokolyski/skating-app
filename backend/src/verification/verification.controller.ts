import {Body, Controller, Delete, Get, Post, Redirect, Req, Res, UseGuards} from '@nestjs/common';
import {VerificationService} from "./verification.service";
import {LoginRequest} from "../api/requests/login.dto";
import {LoginResponse} from "../api/responses/login.dto";
import {Response} from "express";
import {AuthGuard} from "@nestjs/passport";
import * as client_config from '../config/client.json'

@Controller('verification')
export class VerificationController {
    constructor(private verificationService: VerificationService) {

    }

    @Post()
    async login(@Body() loginRequest: LoginRequest, @Res({passthrough: true}) res: Response): Promise<LoginResponse> {

        const response = await this.verificationService.login(loginRequest);


        res.cookie('secure-token', response.token, this.getCookieOptions());
        return Promise.resolve(response);
    }

    @Delete()
    async logout(@Res({passthrough: true}) res: Response): Promise<void> {
        const response = await this.verificationService.logout();

        res.clearCookie('secure-token', this.getCookieOptions())

        return response
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res({passthrough: true}) res: Response) {
        const response = await this.verificationService.googleLogin(req);
        res.cookie('secure-token', response.token, this.getCookieOptions());
        res.redirect(this.getRedirectUrl(response.token), 301);
    }

    private getRedirectUrl(token: string) {
        return client_config.domain + ":" + client_config.port + "/login_callback?token=" + token;
    }

    getCookieOptions() {
        return {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true
        }
    }
}
