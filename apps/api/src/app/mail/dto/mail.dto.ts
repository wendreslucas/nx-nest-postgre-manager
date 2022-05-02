import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MailDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'recipient\'s email',
    })
    recipient: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'subject for the email',
    })
    subject: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'title for the email',
    })
    title: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'content for the email',
    })
    text: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'logo',
    })
    logo: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'btnText for the email',
    })
    btnText: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'link for the email',
    })
    link: string;


    @IsNotEmpty()
    @ApiProperty({
        description: 'footer for the email',
    })
    footer: {[key:string]:string}
}
