import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@nx-nest-postgre-manager/auth';
import { AccountChartComponent } from './account-chart/account-chart.component';
import { AccountListComponent } from './account-list/account-list.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'list', 
    pathMatch: 'full' 
  },
  { 
    path: 'list', 
    component: AccountListComponent,
    canActivate: [AuthGuard],
  },
  { 
    path: 'dashboard', 
    component: AccountChartComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
