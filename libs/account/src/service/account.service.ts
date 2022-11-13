import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IAccount } from '@nx-nest-postgre-manager/api-interfaces';
import { catchError, concatMap, map, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { Account } from '../model/account.model';
import { Env, ENV_TOKEN } from '@nx-nest-postgre-manager/common';
import { AuthService } from '@nx-nest-postgre-manager/auth';

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

  GetCsrfToken(accessToken: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    const options = { headers: headers };
    return this.http.get<any>(`${this.BASE_URL}/csrf-token`, options).pipe(
      map(res => res.token)
    );
  }

  private addAuthHeader(username: string, password: string, func: (header: HttpHeaders) => Observable<any>): Observable<any> {
    let accessToken: string | null;
    return this.authService.FetchToken(username, password).pipe(
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
  }

  private addAuthHeaderByToken(token: string, func: (header: HttpHeaders) => Observable<any>): Observable<any> {
    return this.GetCsrfToken(token).pipe(
      concatMap((csrfToken: string) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'csrf-token': `${csrfToken}`
        });
        return func(headers);
      }),
      catchError(err => {
        console.log(err);
        return of(err);
      })
    )
  }

  CreateAccount(username: string, password: string, account: Account): Observable<Account | string> {
    return this.addAuthHeader(username, password, (headers) => {
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
    })
  }

  GetAccounts(username: string, password: string): Observable<Account[]> {
    return this.addAuthHeader(username, password, (headers) => {
      return this.http.get<IAccount[]>(this.BASE_URL, { headers: headers }).pipe(
        catchError(err => {
          console.log(err)
          return of(err)
        })
      );
    })
  }

  GetAccountsByToken(token: string): Observable<Account[]> {
    return this.addAuthHeaderByToken(token, (headers) => {
      return this.http.get<IAccount[]>(this.BASE_URL, { headers: headers }).pipe(
        catchError(err => {
          console.log(err)
          return of(err)
        })
      );
    })
  }
}
