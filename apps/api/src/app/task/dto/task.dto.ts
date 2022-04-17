import { ApiProperty } from '@nestjs/swagger';
import { ITask, Status, TaskType } from '@nx-nest-postgre-manager/api-interfaces';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class TaskDto implements ITask {
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

