import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@nx-nest-postgre-manager/auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router, 
    public authService: AuthService
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canEnter();
  }
  
  canEnter(): Observable<boolean> {
    return this.authService.accessTokenSubject.pipe(
      map((isLogin) => {
        if (!isLogin) {
          this.router.navigate(["/", "login"]);
        }
        return !!isLogin;
      })
    );
  }
}
