import { JobType, Status, TaskType } from "./enum";

export interface Message {
  message: string;
}

export interface IAccount {
  name: string;
  email: string;
  jobType: JobType;
}

export interface ITask {
  status: Status;
  taskType: TaskType;
}

export interface IRegisteredTask {
  email: string;
  registerTaskType: TaskType;
  taskType: TaskType;
  accounts: IAccount[];
}

export interface IUser {
  username: string;
  password: string;
}

export interface IAuth {
  accessToken: string;
  refreshToken: string;
}
