import { MailerService } from '@nestjs-modules/mailer';
import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Standard } from './templates/Standard';
import { MailDto } from './dto/mail.dto';
import { render } from 'mjml-react';

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
        private configService: ConfigService
    ) { }

    private mockedDta: MailDto = {
        recipient: this.configService.get<string>('MOCKED_RECIPIENTS'),
        subject: 'Daily Learning Newpaper',
        title: 'Daily Learning Newpaper',
        text: `There are several things we need to set for building a new Next.js project. There is a new way that we only have to do it once
        For example, we have to re-create files and settings for Redux, Redux middleware, Styled-components again and again if we need them. Sometimes, we may also need extra things like setting Jest, Enor using TypeScript.`,
        logo: 'https://raw.githubusercontent.com/JenHsuan/ALayman/master/views/images/alaymanicon.png',
        btnText: 'Daily-Learing website',
        link: 'https://daily-learning.herokuapp.com/',
        footer: {
            blog: 'https://medium.com/a-layman',
            facebook: 'https://www.facebook.com/imalayman'
        }
    }

    get template() {
        return render(Standard(this.mockedDta), { validationLevel: 'soft' }).html;
    }

    public sendCustomizedMail(mailDto: MailDto): void {
        console.log(mailDto)
        this.mailerService
            .sendMail({
                to: mailDto.recipient, // list of receivers
                from: this.configService.get<string>('MAILDEV_INCOMING_USER'), // sender address
                subject: mailDto.subject, // Subject line
                html: render(Standard(mailDto), { validationLevel: 'soft' }).html
            })
            .then(res => {
                console.log('send email success', res);
            })
            .catch(err => {
                console.log('send email failed', err);
            });
    }

    public previewCustomizedMail(mailDto: MailDto): string {
        return render(Standard(mailDto), { validationLevel: 'soft' }).html;
    }
}
