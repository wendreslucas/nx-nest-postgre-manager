import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'account',
    component: LayoutComponent,
    loadChildren: () => import('./account/account.module').then(module => module.AccountModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule),
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
