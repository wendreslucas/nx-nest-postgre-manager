import { IUser } from "@nx-nest-postgre-manager/api-interfaces";

export enum Role {
  Dashboard = 'Dashboard',
  Widget = 'Widget',
}

export class UserDto implements IUser {
  username: string;
  password: string;
  role: Role;
  refreshToken?: string;
}
