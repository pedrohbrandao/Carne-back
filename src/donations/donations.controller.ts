import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Req, Res, Post, UseGuards } from '@nestjs/common';
import { DonationService } from './donation.service';
import { Request, Response } from 'express'
import { log } from 'console';

@Controller('donations')
export class DonationsController {

    constructor(private donation: DonationService) { }

    @Post()
    async GetOrd(@Res() response: Response, @Req() req: Request) {
        const buffer = await this.donation.carne(req.body)
        response.set({
            'Content-Type': 'application/pdf',
            'Content-Length': buffer.length,
        })
        return response.end(buffer)
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    async teste(@Res() response: Response, @Req() req: Request) {
        log(req.headers)
        return 200
    }
}
