import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { Env, ENV_TOKEN } from '@nx-nest-postgre-manager/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessTokenSubject: BehaviorSubject<string>;
  accessToken$: Observable<string>;
  private BASE_URL: string;
  
  constructor(
    private http: HttpClient,
    @Inject(ENV_TOKEN) private env: Env
  ) {
    this.BASE_URL = `${this.env.baseApiPrefix}/auth`;
    this.accessTokenSubject = new BehaviorSubject('');
    this.accessToken$ = this.accessTokenSubject.asObservable();
  }

  FetchToken(username: string, password: string): Observable<string> {
    return this.http.post<any>(`${this.BASE_URL}/login/`, { username, password }).pipe(
      map(res => res.access_token ? res.access_token : of('')),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  Login(username: string, password: string): Observable<string> {
    return this.FetchToken(username, password).pipe(
      map(res => {
        if (res) {
          this.accessTokenSubject.next(res);
        }
        return res;
      }),
      catchError(err => throwError(err))
    );
  }
}
