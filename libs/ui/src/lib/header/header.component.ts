import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@nx-nest-postgre-manager/auth';

@Component({
  selector: 'nx-nest-postgre-manager-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faSignOut = faSignOut;
  shouldShowInfo = false;

  get username(): string | null {
    return this.authService.username;
  }
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  
  getDisplayName(): string | null {
    if (this.authService.username) {
      return this.authService.username.length > 1 ? this.authService.username.toUpperCase()[0] : '';
    }

    return null;
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.authService.gotoLoginPage(this.router);
    });
  }

  toggleInfo() {
    this.shouldShowInfo = !this.shouldShowInfo;
  }
}
