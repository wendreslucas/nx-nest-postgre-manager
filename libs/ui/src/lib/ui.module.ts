import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  declarations: [
    NavbarComponent,
    HeaderComponent,
    LayoutComponent
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    LayoutComponent
  ]
})
export class UiModule {}
