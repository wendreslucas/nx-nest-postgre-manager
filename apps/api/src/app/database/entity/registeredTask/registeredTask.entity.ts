import { IRegisteredTask, TaskType } from '@nx-nest-postgre-manager/api-interfaces';
import { IsEnum } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Account } from '../account/accont.entity';

@Entity()
export class RegisteredTask implements Omit<IRegisteredTask, 'email' | 'registerTaskType'> {
  @PrimaryColumn({ type: 'varchar' })
  @IsEnum(TaskType)
  taskType: TaskType;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToMany(() => Account, (account) => account.registeredTasks, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable()
  accounts: Account[];
}
