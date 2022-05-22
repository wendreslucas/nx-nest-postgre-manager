import { Component, Inject, OnInit } from '@angular/core';
import { Account, AccountService } from '@nx-nest-postgre-manager/account';
import { Env, ENV_TOKEN } from '@nx-nest-postgre-manager/common';

@Component({
  selector: 'nx-nest-postgre-manager-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent {
  accounts: Account[] = [];
  constructor(
    private accountService: AccountService,
    @Inject(ENV_TOKEN) private env: Env
  ) {
    this.accountService.GetAccounts(this.env.username, this.env.password).subscribe((accounts: Account[]) => {
      this.accounts = accounts;
      console.log(this.accounts)
    })
  }

}
