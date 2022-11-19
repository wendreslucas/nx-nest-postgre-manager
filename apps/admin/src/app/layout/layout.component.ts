import { Component, OnInit } from '@angular/core';
import { NAV_BAR_ITEMS } from '../service/navbar';

@Component({
  selector: 'nx-nest-postgre-manager-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  navBarItems = NAV_BAR_ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

}
