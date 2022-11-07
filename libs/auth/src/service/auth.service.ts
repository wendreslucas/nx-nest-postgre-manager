import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Env, ENV_TOKEN } from '@nx-nest-postgre-manager/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessTokenSubject: BehaviorSubject<string>;
  private BASE_URL: string;
  constructor(
    private http: HttpClient,
    @Inject(ENV_TOKEN) private env: Env
  ) {
    this.BASE_URL = `${this.env.baseApiPrefix}/auth`;
    this.accessTokenSubject = new BehaviorSubject('');
  }

  FetchToken(username: string, password: string): Observable<string> {
    return this.http.post<any>(`${this.BASE_URL}/login/`, { username, password }).pipe(
      map(res => {
        this.accessTokenSubject.next(res.access_token);
        return res.access_token ? res.access_token : of('');
      }),
      catchError(err => {
        console.log(err);
        this.accessTokenSubject.next('');
        return of(err);
      })
    );
  }
}
