import { Component, Inject } from '@angular/core';
import { Account, AccountService } from '@nx-nest-postgre-manager/account';
import { AuthService } from '@nx-nest-postgre-manager/auth';
import { ENV_TOKEN, Env } from '@nx-nest-postgre-manager/common';

@Component({
  selector: 'nx-nest-postgre-manager-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent {
  accounts: Account[] = [];
  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    @Inject(ENV_TOKEN) private env: Env
  ) {
    // this.authService.accessToken$.subscribe(token => {
    //   this.accountService.GetAccountsByToken(token).subscribe((accounts: Account[]) => {
    //     this.accounts = accounts;
    //   })
    // });
    this.accountService.GetAccounts(this.env.username, this.env.password).subscribe((accounts: Account[]) => {
      this.accounts = accounts;
      console.log(this.accounts)
    })

  }

}
