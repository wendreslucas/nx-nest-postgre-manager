import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, filter, Observable, take, switchMap, catchError, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { HTTP_CONFIG_TIOKEN } from '@nx-nest-postgre-manager/common';
import { HttpConfig } from 'libs/common/src/model/http-config.model';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    @Inject(HTTP_CONFIG_TIOKEN) private httpConfig: HttpConfig,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && 
            error.status === 401 && 
            request.url.split('/').find(path => path !== this.httpConfig.loginUrl)) {
          return this.Handle401Error(error, request, next);
        }
        return throwError(error)
      })
    );
  }

  private Handle401Error(error: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshAccessToken().pipe(
        switchMap(accessToken => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(accessToken);
          return next.handle(request);
        }),
        catchError(refreshError => {
          this.isRefreshing = false;
          this.authService.gotoLoginPage(this.router);
          return throwError(refreshError);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(accessToken => !!accessToken),
        take(1),
        switchMap(accessToken => {
          return next.handle(request);
        })
      );
    }
  }
}
