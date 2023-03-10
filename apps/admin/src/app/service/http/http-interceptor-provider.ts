import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthTokenInterceptor } from "@nx-nest-postgre-manager/auth";
import { LoadingInterceptor } from "@nx-nest-postgre-manager/loading";

export const httpInterceptorProvider = 
{
  provide: HTTP_INTERCEPTORS,
  useClass: LoadingInterceptor,
  multi: true
};