import { Component, OnInit } from '@angular/core';
import { JobType } from '@nx-nest-postgre-manager/api-interfaces';

@Component({
  selector: 'nx-nest-postgre-manager-account-field-job-type',
  templateUrl: './account-field-job-type.component.html',
  styleUrls: ['./account-field-job-type.component.scss'],
})
export class AccountFieldJobTypeComponent implements OnInit {
  jobTypes = Object.values(JobType).map((type, index) => {
    const typeList = type.split(' ');
    return {
      name: this.capitalize(type),
      id: index,
      group: typeList.length >= 1 ? this.capitalize(typeList[typeList.length - 1]) : this.capitalize(type)
    }
  })

  selectedCar: any = null;

  placeholder = 'Job Title...';

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onClose() {
    console.log(this.selectedCar)
    if (this.selectedCar !== null) {
      this.placeholder = '';
    }
  }

  constructor() {}

  ngOnInit(): void {}


}
