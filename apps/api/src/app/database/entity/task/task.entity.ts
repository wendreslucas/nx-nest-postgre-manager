import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';

  export enum Status {
    IN_PROGRESS = 'inProgress',
    COMPLETED = 'completed',
    INITIAL = 'initial',
    START = 'start',
  }

  export enum TaskType {
    REGULAR_MAIL = 'regularMail',
    NONE = 'none',
  }

  @Entity()
  export class Task {
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
