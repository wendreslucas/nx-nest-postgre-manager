import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AccountChartPieSettingService } from './service/account-chart-pie-setting.service';
import { AccountChartItemType, AccountChartPieChartSetting } from './service/account-chart-pie.domain';
import { AccountChartPieService } from './service/account-chart-pie.service';

@Component({
  selector: 'nx-nest-postgre-manager-account-chart-pie',
  templateUrl: './account-chart-pie.component.html',
  styleUrls: ['./account-chart-pie.component.scss']
})
export class AccountChartPieComponent implements OnInit {
  options: any;
  constructor(
    private router: Router, 
    private accountChartService: AccountChartPieService,
    private accountChartSettingService: AccountChartPieSettingService
  ) { 
  }

  ngOnInit(): void {
    combineLatest([
      this.accountChartService.convertData(),
      this.accountChartSettingService.getSetting()
    ])
    .subscribe(
      ([
        data, 
        option
      ]: any) => {
        (option as AccountChartPieChartSetting).series[0].data = data.items;
        (option as AccountChartPieChartSetting).legend.data = data.items.map((item: AccountChartItemType) => item.name); 
        this.options = option;
      },
      (err) => {
        console.log(err);
        this.router.navigate(["/", "login"]);
      })
  }
}
