import { ApiProperty } from '@nestjs/swagger';
import { IRegisteredTask, TaskType } from '@nx-nest-postgre-manager/api-interfaces';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class RegisteredTaskDto implements IRegisteredTask{
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsEnum(TaskType)
  @IsNotEmpty()
  @ApiProperty({
    enum: Object.values(TaskType)
  })
  registerTaskType: TaskType;
}
