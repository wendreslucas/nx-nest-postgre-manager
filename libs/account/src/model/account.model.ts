import { IAccount, IUser, JobType } from '@nx-nest-postgre-manager/api-interfaces';

export class Account implements IAccount{
  name: string;
  email: string;
  jobType: JobType;

  //virtual
  isSelected: boolean;
}

export class AuthUser implements IUser{
  username: string;
  password: string;
}

export enum AccountPasswordInputType {
  Password = 'password',
  Text = 'text'
}
  
export enum AccountPasswordTipType {
  Show = 'show',
  Hide = 'hide'
}