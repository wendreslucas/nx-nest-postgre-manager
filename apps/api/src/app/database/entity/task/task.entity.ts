import { ITask, Status, TaskType } from '@nx-nest-postgre-manager/api-interfaces';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';

  @Entity()
  export class Task implements ITask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      type: 'enum',
      enum: Status,
      default: Status.INITIAL,
    })
    status: Status;

    @Column({
      type: 'enum',
      enum: TaskType,
      default: TaskType.NONE,
    })
    taskType: TaskType;

    @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;
  }
