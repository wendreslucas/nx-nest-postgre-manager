import { ENV_TOKEN } from "@nx-nest-postgre-manager/common";
import { environment } from "apps/admin/src/environments/environment";

export const envProvider = 
{
    provide: ENV_TOKEN,
    useValue: environment
};