import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@nx-nest-postgre-manager/auth';

@Component({
  selector: 'nx-nest-postgre-manager-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}
  
  getDisplayName(): string {
    return this.authService.username.length > 1 ? this.authService.username.toUpperCase()[0] : '';
  }
}
