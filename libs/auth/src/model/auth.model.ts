import { IAuth } from "@nx-nest-postgre-manager/api-interfaces";

export class AuthToken implements IAuth{
  accessToken: string;
  refreshToken: string;
}