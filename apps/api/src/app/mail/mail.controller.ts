import { Body, Controller, Get, Post, UseGuards, Res, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { MailDto } from './dto/mail.dto';
import { MailService } from './mail.service';
import { Csrf } from "ncsrf";
import { CsrfService } from '../service/csrf.service';

@ApiBearerAuth()
@Controller('/api/mail')
export class MailController {
    constructor(
        private mailService: MailService,
        private csrfService: CsrfService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Csrf()
    @ApiBody({ type: MailDto})
    @Post()
    sendMail(@Body() body: MailDto) {
        this.mailService.sendCustomizedMail(body);
    }

    @UseGuards(JwtAuthGuard)
    @Csrf()
    @Post('preview')
    @ApiBody({ type: MailDto})
    previewMail(@Body() body: MailDto, @Res() res: Response) {
        return res.send(this.mailService.previewCustomizedMail(body));
    }

    @Get('mock')
    preview(@Res() res: Response) {
        return res.send(this.mailService.template)
    }

    /*
    Get CSRF token
    */
    @Get('csrf-token')
    GetCsrfToken(@Req() req): any {
        return this.csrfService.GetCsrfToken(req);
    }

}
