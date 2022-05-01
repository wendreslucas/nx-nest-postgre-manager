import { IAccount, JobType } from '@nx-nest-postgre-manager/api-interfaces';

export class Account implements IAccount{
    name!: string;
    email!: string;
    jobType!: JobType;
}
