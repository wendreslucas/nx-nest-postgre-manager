import { IAuth } from "@nx-nest-postgre-manager/api-interfaces";

export class AuthTokenDto implements IAuth{
  accessToken: string;
  refreshToken: string;
}