import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccountChartPieChartSetting } from './account-chart-pie.domain';

@Injectable({
  providedIn: 'root'
})
export class AccountChartPieSettingService {
  private setting: AccountChartPieChartSetting;
  constructor() { 
    this.setting = Object.assign(new AccountChartPieChartSetting(), {
      title: {
        text: "Job Type of Accounts",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        x: "center",
        y: "bottom",
        data: []
      },
      calculable: true,
      series: [
        {
          name: "Job Type",
          type: "pie",
          radius: [30, 110],
          data: []
        }
      ]
    });
  }

  getSetting(): Observable<AccountChartPieChartSetting> {
    return of(this.setting);
  }
}
