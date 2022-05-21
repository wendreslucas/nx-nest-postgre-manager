import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AccountModule } from './account/account.module';

import { createCustomElement } from '@angular/elements';
import { AccountComponent } from './account/account.component';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../environments/environment';
import { ENV_TOKEN } from '@nx-nest-postgre-manager/common';

@NgModule({
  declarations: [],
  imports: [BrowserModule, AppRoutingModule, AccountModule],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }, {
      provide: ENV_TOKEN,
      useValue: environment
    }],
  bootstrap: [],
  entryComponents: [AccountComponent]
})
export class AppModule implements DoBootstrap{
  constructor(private injector: Injector) {

  }

  ngDoBootstrap() {
    const accountElement = createCustomElement(AccountComponent, { injector: this.injector });
    customElements.define('dl-account', accountElement);
  }
}
