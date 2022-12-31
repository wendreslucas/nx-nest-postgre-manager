import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UiModule } from '@nx-nest-postgre-manager/ui';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppRoutingModule } from './app-routing.module';
import { AccountModule } from './account/account.module';
import { LayoutComponent } from './layout/layout.component';
import { httpInterceptorProvider } from './service/http/http-interceptor-provider';
import { envProvider } from './service/env/env.provider';
import { httpConfigProvider } from './service/http/http-config-provider';
import { httpAuthTokenInterceptorProvider } from './service/http/http-auth-token-interceptor-provider';

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
  providers: [
    envProvider,
    httpConfigProvider,
    httpAuthTokenInterceptorProvider,
    httpInterceptorProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
