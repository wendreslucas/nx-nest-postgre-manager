import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UiModule } from '@nx-nest-postgre-manager/ui';
import { ENV_TOKEN } from '@nx-nest-postgre-manager/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AccountModule } from './account/account.module';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    UiModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [{
    provide: ENV_TOKEN,
    useValue: environment
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
