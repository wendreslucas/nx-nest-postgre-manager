import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AccountModule } from './account/account.module';

import { createCustomElement } from '@angular/elements';
import { AccountComponent } from './account/account.component';
import { APP_BASE_HREF } from '@angular/common';
import { httpConfigProvider } from './service/http/http-config-provider';
import { envProvider } from './service/env/env.provider';

@NgModule({
  declarations: [],
  imports: [BrowserModule, AccountModule],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    envProvider,
    httpConfigProvider
  ],
  bootstrap: []
})
export class AppModule implements DoBootstrap{
  constructor(private injector: Injector) {

  }

  ngDoBootstrap() {
    const accountElement = createCustomElement(AccountComponent, { injector: this.injector });
    if (!customElements.get('dl-account')) {
      customElements.define('dl-account', accountElement);
    }
  }
}
