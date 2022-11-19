import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { ENV_TOKEN } from '@nx-nest-postgre-manager/common';
import { AccountModule } from './account/account.module';
import { LayoutComponent } from './layout/layout.component';
import { UiModule } from '@nx-nest-postgre-manager/ui';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    UiModule
  ],
  providers: [{
    provide: ENV_TOKEN,
    useValue: environment
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
