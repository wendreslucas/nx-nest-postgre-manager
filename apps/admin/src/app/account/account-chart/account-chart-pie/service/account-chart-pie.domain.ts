export class AccountChart {
  items: AccountChartItemType[];
}

export class AccountChartItemType { 
  name: string;
  value: number;
};

export class AccountChartPieChartSetting {
  title: any;
  tooltip: any;
  legend: any;
  calculable: boolean;
  series: any[];
}