import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account, AccountService } from '@nx-nest-postgre-manager/account';

@Component({
  selector: 'nx-nest-postgre-manager-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit{
  accounts: Account[] = [];
  constructor(
    private router: Router, 
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.accountService
    .GetAccounts()
    .subscribe((accounts: Account[]) => {
      this.accounts = accounts;
    },
    (err) => {
      console.log(err);
      this.router.navigate(["/", "login"]);
    });
  }

}
