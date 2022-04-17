import { IAccount, JobType } from '@nx-nest-postgre-manager/api-interfaces';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { RegisteredTask } from '../registeredTask/registeredTask.entity';

@Entity()
export class Account implements IAccount {
  @PrimaryColumn({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({
    type: 'enum',
    enum: JobType,
    default: JobType.softwareEngineer,
  })
  jobType: JobType;

  @ManyToMany(
    () => RegisteredTask,
    (registeredTask) => registeredTask.accounts,
    {
      nullable: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  registeredTasks!: RegisteredTask[];
}
