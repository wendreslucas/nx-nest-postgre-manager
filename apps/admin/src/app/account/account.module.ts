import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountRoutingModule } from './account-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountLoginComponent } from './account-login/account-login.component';

@NgModule({
  declarations: [
    AccountListComponent, 
    AccountLoginComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
})
export class AccountModule {}
