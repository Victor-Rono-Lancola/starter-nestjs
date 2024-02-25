/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Post, Response } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/get-token')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Token generated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid credentials' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    generateToken(@Body() credentials: any) {
        return this.authService.generateToken(credentials);
    }

    @Post('/login')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Token generated successfully' })
    @ApiResponse({ status: 401, description: 'Access Denied' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    login(@Body() credentials: any) {
        return this.authService.login(credentials);
    }

    @Post('/signup')
    signup(@Body() credentials: any) {
        return this.authService.signup(credentials);
    }

    @Post('/check')
    checkIfEmailExists(@Body() credentials: any) {
        return this.authService.checkIfEmailExists(credentials);
    }

    @Post('/reset-password')
    resetPassword(@Body() credentials: any) {
        return this.authService.resetPassword(credentials);
    }


}
