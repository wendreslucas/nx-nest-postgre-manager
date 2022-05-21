import { InjectionToken } from "@angular/core";
import { Env } from "./interface";

export const ENV_TOKEN = new InjectionToken<Env>('env token');
