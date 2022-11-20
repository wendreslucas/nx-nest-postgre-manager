import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { NavBarItem } from './service/navbar.domain';

@Component({
  selector: 'nx-nest-postgre-manager-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faUsers = faUsers;
  isNavBarFolded = false;
  currentPath = '';

  @Input('navData') navData: NavBarItem[]; 
  
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.url.subscribe((url: UrlSegment[]) => {
      let paths = this.route.url.split('/');
      this.currentPath = paths[paths.length - 1]
    })
  }

  ngOnInit(): void {
  }

  getNavBarButtonContent(): string {
    return this.isNavBarFolded ? '>' : '<';
  }

  changeNavBarWidth(): void {
    this.isNavBarFolded = !this.isNavBarFolded;
  }
  
  changeNavBarItem(index: number): void {
    this.navData[index].isFolded = !this.navData[index].isFolded;
  }

  getNavbarContainerStyle(): string {
    return this.isNavBarFolded ? 'navbar-container fold' : 'navbar-container';
  }

  getNavbarButtonStyle(): string {
    return this.isNavBarFolded ? 'control-button fold' : 'control-button';
  }

  getNavbarItemStyle(index: number): string {
    return this.navData[index].isFolded ? 'navbar-item-group-title-button fold' : 'navbar-item-group-title-button';
  }

  getNavbarSubitemStyle(path: string): string {
    return path === this.currentPath ? 'navbar-subitem current-path' : 'navbar-subitem';
  }

  navaigate(target: string): void {
    this.route.navigateByUrl(target)
  }
}
