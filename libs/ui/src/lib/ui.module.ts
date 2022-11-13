import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ListComponent,
    NavbarComponent
  ],
  exports: [
    ListComponent,
    NavbarComponent
  ]
})
export class UiModule {}
