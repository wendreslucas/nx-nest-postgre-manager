import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Env, ENV_TOKEN, HTTP_CONFIG_TIOKEN } from '@nx-nest-postgre-manager/common';
import { NavigationExtras, Router } from '@angular/router';
import { HttpConfig } from 'libs/common/src/model/http-config.model';
import { AuthToken } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string;
  
  get username(): string | null {
    return sessionStorage.getItem('username');
  }

  set username(username: string | null) {
    if (username) {
      sessionStorage.setItem('username', username);
    }
  }
  
  get loginUrl() {
    return this.httpConfig.loginUrl;
  }

  constructor(
    @Inject(ENV_TOKEN) private env: Env,
    @Inject(HTTP_CONFIG_TIOKEN) private httpConfig: HttpConfig,
    private http: HttpClient
  ) {
    this.BASE_URL = `${this.env.baseApiPrefix}/auth`;
  }

  fetchAccessToken(username: string, password: string): Observable<AuthToken> {
    return this.http.post<AuthToken>(
      `${this.BASE_URL}/login/`, 
      { username, password }
    ).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  refreshAccessToken(): Observable<string> {
    return this.http.get<string>(
      `${this.BASE_URL}/refresh?username=${this.username}`
    ).pipe(
      tap(res => this.username = this.username),
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }

  login(username: string, password: string): Observable<AuthToken> {
    return this.fetchAccessToken(username, password)
    .pipe(
      tap(res => this.username = username),
      catchError(err => throwError(err))
    );
  }

  logout(): Observable<string> {
    return this.http.get<string>(
      `${this.BASE_URL}/logout?username=${this.username}`
    ).pipe(
      tap(res => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('refresh_token');
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  getCsrfToken(accessToken?: string): Observable<string> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (accessToken) {
      Object.assign(headers, {
        'Authorization': `Bearer ${accessToken}`
      });  
    }

    return this.http.get<any>(`${this.BASE_URL}/csrf`, { headers })
    .pipe(
      map(res => res.token)
    );
  }
  
  gotoLoginPage(router: Router, extraParam?: any, extras?: NavigationExtras) {
    let params: any[] = [this.loginUrl];

    if (extraParam) {
      params.push(extraParam);
    }
    router.navigate(params, extras);
  }
}
