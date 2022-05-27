import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users.service';
import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService, private AuthService:AuthService){}

    @Get()
    async Getall() {
        return this.usersService.findall()
    }
    @Post()
    async NewUser(@Req() request: Request) {
        return this.usersService.newuser(request.body)
    }
}
