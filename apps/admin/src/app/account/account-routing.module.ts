import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../service/guard/auth.guard';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountLoginComponent } from './account-login/account-login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'list', 
    component: AccountListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: AccountLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
