import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IAccount } from '@nx-nest-postgre-manager/api-interfaces';
import { catchError, concatMap, map, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { Account } from '../model/account.model';
import { Env, ENV_TOKEN } from '@nx-nest-postgre-manager/common';
import { AuthService, AuthUser } from '@nx-nest-postgre-manager/auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private BASE_URL: string;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(ENV_TOKEN) private env: Env
  ) {
    this.BASE_URL = `${this.env.baseApiPrefix}/account`;
  }

  GetCsrfToken(accessToken?: string): Observable<string> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (accessToken) {
      Object.assign(headers, {
        'Authorization': `Bearer ${accessToken}`
      });  
    }

    const options = { headers: headers };
    return this.http.get<any>(`${this.BASE_URL}/csrf-token`, options).pipe(
      map(res => res.token)
    );
  }

  private addAuthHeader(func: (header: HttpHeaders) => Observable<any>, authUer?: AuthUser): Observable<any> {
    if (authUer) {
      let accessToken: string | null;
      return this.authService.FetchToken(authUer.username, authUer.password).pipe(
        tap(token => accessToken = token),
        concatMap((token: string) => {
          return this.GetCsrfToken(token)
        }),
        concatMap((csrfToken: string) => {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'csrf-token': `${csrfToken}`
          });
          return func(headers);
        }),
        catchError(err => {
          console.log(err);
          return of(err);
        })
      ) 
    } else {
      return this.GetCsrfToken().pipe(
        switchMap((csrfToken) => {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'csrf-token': `${csrfToken}`
          });
          return func(headers);
        })
      );
    }
  }

  CreateAccount(account: Account, authUer?: AuthUser): Observable<Account | string> {
    return this.addAuthHeader((headers) => {
      return this.http.post<IAccount>(this.BASE_URL, account, { headers: headers }).pipe(
        map(account => Object.assign(
          new Account(), {
          name: account.name,
          email: account.email,
          jobType: account.jobType
        })),
        catchError(err => {
          console.log(err)
          return of(err)
        })
      );
    }, authUer)
  }

  GetAccounts(authUer?: AuthUser): Observable<Account[]> {
    return this.addAuthHeader((headers) => {
      return this.http.get<IAccount[]>(this.BASE_URL, { headers: headers}).pipe(
        catchError(err => {
          console.log(err)
          return of(err)
        })
      );
    }, authUer)
  }
}
