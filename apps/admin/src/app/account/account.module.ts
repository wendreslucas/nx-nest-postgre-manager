import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountRoutingModule } from './account-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccountListComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
})
export class AccountModule {}
