import { Component, Input, OnInit } from '@angular/core';
import { NavBarItem } from '../navbar/service/navbar.domain';

@Component({
  selector: 'nx-nest-postgre-manager-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Input('navBarItems') navBarItems: NavBarItem[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
