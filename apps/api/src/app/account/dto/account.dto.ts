import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export enum JobType {
  softwareEngineer = 'software engineer',
  eningeeringManager = 'eningeering manager',
  productManager = 'product manager',
  marketer = 'marketer',
  sales = 'sales',
  designer = 'designer',
  student = 'student',
}

export class AccountDto {
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
