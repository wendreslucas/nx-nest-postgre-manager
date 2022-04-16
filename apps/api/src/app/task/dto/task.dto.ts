import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status, TaskType } from '../../database/entity/task/task.entity';

export class TaskDto {
  status: Status = Status.INITIAL;

  @IsEnum(TaskType)
  @IsNotEmpty()
  taskType: TaskType;
}
