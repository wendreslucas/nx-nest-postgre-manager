import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { TaskType } from '../../database/entity/task/task.entity';

export class RegisteredTaskDto {
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
