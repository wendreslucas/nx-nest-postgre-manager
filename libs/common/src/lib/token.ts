import { InjectionToken } from "@angular/core";
import { HttpConfig } from "../model/http-config.model";
import { Env } from "./interface";

export const ENV_TOKEN = new InjectionToken<Env>('env token');

export const HTTP_CONFIG_TIOKEN = new InjectionToken<HttpConfig>('http.config');
