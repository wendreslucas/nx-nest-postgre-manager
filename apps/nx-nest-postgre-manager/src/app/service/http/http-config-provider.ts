import { HTTP_CONFIG_TIOKEN } from "@nx-nest-postgre-manager/common";
import { HttpConfig } from "libs/common/src/model/http-config.model";


export const HTTP_CONFIG_VALUE: HttpConfig = new HttpConfig(
  "login"
);

export const httpConfigProvider = 
{
  provide: HTTP_CONFIG_TIOKEN,
  useValue: HTTP_CONFIG_VALUE
};