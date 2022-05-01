import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

const BASE_URL = `${environment.baseApiPrefix}/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  FetchToken(username: string, password: string): Observable<string> {
    return this.http.post<any>(`${BASE_URL}/login`, { username, password }).pipe(
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
