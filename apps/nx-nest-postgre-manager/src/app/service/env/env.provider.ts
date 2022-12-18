import { ENV_TOKEN } from "@nx-nest-postgre-manager/common";
import { environment } from "apps/nx-nest-postgre-manager/src/environments/environment.prod";

export const envProvider = 
{
    provide: ENV_TOKEN,
    useValue: environment
};