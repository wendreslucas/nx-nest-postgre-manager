import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account, AccountService } from '@nx-nest-postgre-manager/account';

@Component({
  selector: 'nx-nest-postgre-manager-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent {
  accounts: Account[] = [];

  constructor(private accountService: AccountService) {
    this.initAccounts();
  }

  initAccounts() {
    this.accountService
    .getAccounts()
    .subscribe(
      (accounts: Account[]) => {
        this.accounts = accounts;
      }
    );
  }

}
