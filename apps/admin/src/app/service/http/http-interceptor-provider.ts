import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthTokenInterceptor } from "@nx-nest-postgre-manager/auth";

export const httpInterceptorProvider = 
{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthTokenInterceptor,
  multi: true
};