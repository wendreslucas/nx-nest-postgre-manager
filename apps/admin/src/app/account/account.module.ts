import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountRoutingModule } from './account-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UiModule } from '@nx-nest-postgre-manager/ui';
import { AccountChartComponent } from './account-chart/account-chart.component';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountChartComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    UiModule
  ],
})
export class AccountModule {}
