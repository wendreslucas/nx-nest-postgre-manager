import { ApiProperty } from '@nestjs/swagger';
import { IAccount, JobType } from '@nx-nest-postgre-manager/api-interfaces';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class AccountDto implements IAccount {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsEnum(JobType)
  @IsNotEmpty()
  @ApiProperty({
    enum: Object.values(JobType)
  })
  jobType: JobType;
}
