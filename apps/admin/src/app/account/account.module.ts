import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountRoutingModule } from './account-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UiModule } from '@nx-nest-postgre-manager/ui';
import { AccountChartComponent } from './account-chart/account-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { AccountChartPieComponent } from './account-chart/account-chart-pie/account-chart-pie.component';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountChartComponent,
    AccountChartPieComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    NgxEchartsModule.forChild(),
  ],
})
export class AccountModule {}
