import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status, TaskType } from '../../database/entity/task/task.entity';

export class TaskDto {
  @ApiProperty({
    enum: Object.values(Status)
  })
  status: Status = Status.INITIAL;

  @IsEnum(TaskType)
  @IsNotEmpty()
  @ApiProperty({
    enum: Object.values(TaskType)
  })
  taskType: TaskType;
}

