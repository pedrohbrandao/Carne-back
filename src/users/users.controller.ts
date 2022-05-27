import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users.service';
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService, private AuthService: AuthService) { }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async Getall() {
        return this.usersService.findall()
    }
    @Post()
    async NewUser(@Req() request: Request) {
        return this.usersService.newuser(request.body)
    }
}
