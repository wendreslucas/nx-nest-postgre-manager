import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JobType } from '@nx-nest-postgre-manager/api-interfaces';
import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'nx-nest-postgre-manager-account-field-job-type',
  templateUrl: './account-field-job-type.component.html',
  styleUrls: ['./account-field-job-type.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AccountFieldJobTypeComponent,
      multi: true
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountFieldJobTypeComponent implements OnInit, OnDestroy, ControlValueAccessor {
  jobTypes = Object.values(JobType).map((type, index) => {
    const typeList = type.split(' ');
    return {
      name: this.capitalize(type),
      type: type,
      id: index,
      group: typeList.length >= 1 ? this.capitalize(typeList[typeList.length - 1]) : this.capitalize(type)
    }
  })

  selection: any = null;
  placeholder = 'Job Title...';
  selectSubject = new BehaviorSubject<any>(undefined);

  destroyed = new Subject();

  ngOnInit() {
    this.selectSubject.pipe(
      filter(selected => selected),
      takeUntil(this.destroyed)
    ).subscribe(selected => {
      if (this.onChange) {
        //Change the model
        this.onChange(selected);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyed.next('');
  }

  onChange(value: any){}
  onTouched(){}

  onClose() {
    if (this.selection !== null) {
      this.placeholder = '';
    }
    this.selectSubject.next(this.selection)
  }

  onClear() {
    this.selection = '';
    this.placeholder = 'Job Title...';
  }

  //Change the view when the model is changed
  writeValue(obj: any): void {
    this.placeholder = obj === '' ? this.placeholder : obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }



}
