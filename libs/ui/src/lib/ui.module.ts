import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [
    NavbarComponent,
    HeaderComponent,
    LayoutComponent,
    SpinnerComponent,
  ],
  exports: [NavbarComponent, HeaderComponent, LayoutComponent, SpinnerComponent],
})
export class UiModule {}
