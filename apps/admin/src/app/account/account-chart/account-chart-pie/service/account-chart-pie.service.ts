import { Inject, Injectable } from '@angular/core';
import { Account, AccountService } from '@nx-nest-postgre-manager/account';
import { JobType } from '@nx-nest-postgre-manager/api-interfaces';
import { map, Observable, switchMap } from 'rxjs';
import { AccountChart, AccountChartItemType } from './account-chart-pie.domain';

@Injectable({
  providedIn: 'root'
})
export class AccountChartPieService {
  constructor(private accountService: AccountService) { }

  convertData(): Observable<AccountChart> {
    return this.accountService.GetAccounts()
    .pipe(
      map((accounts: Account[]) => {
        let accountMap = new Map<JobType, number>([]);

        accounts.forEach((account) => {
          if (!accountMap.get(account.jobType)) {
            accountMap.set(account.jobType, 1);
          } else {
            accountMap.set(account.jobType, accountMap.get(account.jobType) + 1);
          }
        });

        return Object.assign(new AccountChart(), {
          items: [...accountMap.keys()].map((key) => {
            return Object.assign(new AccountChartItemType(), {
              name: key,
              value: accountMap.get(key)
            });
          })
        });
      })
  )}
}
