import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountModule } from './account/account.module';

import { createCustomElement } from '@angular/elements';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AccountModule],
  providers: [],
  bootstrap: [AppComponent],
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
