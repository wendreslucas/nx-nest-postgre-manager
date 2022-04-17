import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { RegisteredTask } from '../registeredTask/registeredTask.entity';
import { JobType } from '../../../account/dto/account.dto';

@Entity()
export class Account {
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
