import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Env, ENV_TOKEN } from '@nx-nest-postgre-manager/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string;
  constructor(
    private http: HttpClient,
    @Inject(ENV_TOKEN) private env: Env
  ) {
    this.BASE_URL = `${this.env.baseApiPrefix}/auth`;
  }

  FetchToken(username: string, password: string): Observable<string> {
    return this.http.post<any>(`${this.BASE_URL}/login/`, { username, password }).pipe(
      map(res => {
        if (!res.access_token) {
          return of('')
        }
        return res.access_token
      }),
      catchError(err => {
        console.log(err);
        return of(err);
      })
    );
  }
}
