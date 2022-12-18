import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, concatMap, map, Observable, of, switchMap, tap } from 'rxjs';
import { IAccount } from '@nx-nest-postgre-manager/api-interfaces';
import { Env, ENV_TOKEN } from '@nx-nest-postgre-manager/common';
import { AuthService, AuthToken, AuthTokenInterceptor } from '@nx-nest-postgre-manager/auth';
import { Account, AuthUser } from '../model/account.model';

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

  createAccount(account: Account, authUer: AuthUser): Observable<Account | string> {
    return this.authService.fetchAccessToken(authUer.username, authUer.password).pipe(
      switchMap((accessToken: AuthToken) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken.accessToken}`,
        });
        return this.http.post<IAccount>(this.BASE_URL, account, { headers }).pipe(
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
        )
      })
    )
  }

  getAccounts(authUer?: AuthUser): Observable<Account[]> {
    return this.addAuthHeader((headers) => {
      return this.http.get<IAccount[]>(this.BASE_URL, { headers})
      .pipe(
        catchError(err => {
          console.log(err)
          return of([])
        })
      );
    }, authUer)
  }

  private addAuthHeader(authFn: (header: HttpHeaders) => Observable<any>, authUer?: AuthUser): Observable<any> {
    if (authUer) {
      let accessToken: string | null;
      return this.authService.fetchAccessToken(authUer.username, authUer.password).pipe(
        tap(token => accessToken = token.accessToken),
        switchMap((token: AuthToken) => {
          return this.authService.getCsrfToken(token.accessToken)
        }),
        switchMap((csrfToken: string) => {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'csrf-token': `${csrfToken}`
          });
          return authFn(headers);
        }),
        catchError(err => {
          console.log(err);
          return of(err);
        })
      ) 
    } else {
      return this.authService.getCsrfToken().pipe(
        switchMap((csrfToken) => {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'csrf-token': `${csrfToken}`
          });
          return authFn(headers);
        }),
        catchError(err => {
          console.log(err);
          return of(err);
        })
      );
    }
  }
}
