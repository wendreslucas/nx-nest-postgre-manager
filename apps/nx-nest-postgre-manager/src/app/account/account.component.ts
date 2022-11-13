import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobType } from '@nx-nest-postgre-manager/api-interfaces';

import { faEnvelope, faCheck, faExclamationTriangle, faSpinner, faX } from '@fortawesome/free-solid-svg-icons';
import { Env, ENV_TOKEN } from '@nx-nest-postgre-manager/common';
import { AccountService } from '@nx-nest-postgre-manager/account';

@Component({
  selector: 'nx-nest-postgre-manager-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit{
  jobTypes = Object.values(JobType);
  accountForm: FormGroup;
  faEnvelope = faEnvelope;
  faCheck = faCheck;
  faExclamationTriangle = faExclamationTriangle;
  faSpinner = faSpinner;
  faX = faX;

  hasSendRequest = false;
  isSuccessful = false;
  isFailed = false;

  constructor(
    private accountService: AccountService,
    @Inject(ENV_TOKEN) private env: Env
  ) {
    this.accountForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      jobType: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.accountForm.valueChanges.subscribe(
      () => {
        this.hasSendRequest = false;
        this.isSuccessful = false;
        this.isFailed = false;
      }
    )
  }

  get shouldWait() {
    return (!this.isFailed && !this.isSuccessful) && this.hasSendRequest
  }

  errorMessage(key: string): string {
    const nameField = this.accountForm.get(key);
    if (nameField?.touched && nameField?.invalid) {
      if (nameField.hasError('required')) {
        return 'Name is required';
      }
      if (nameField.hasError('email')) {
        return 'Incorrect email format';
      }
    }
    return '';
  }

  onSubmit() {
    this.hasSendRequest = true;
    if (this.env.username && this.env.password) {
    this.accountService.CreateAccount(this.env.username, this.env.password, this.accountForm.value)
      .subscribe(
        (res: any) => {
          if (res && res.error) {
            this.isFailed = true;
            console.error(res)
            return;
          }
          this.isSuccessful = true;
        },
        (err) => {
          console.error(err);
          this.isFailed = true;
        }
      );
  } else {
    console.error('Please set the username and password in env variables');
  }
  }

}
