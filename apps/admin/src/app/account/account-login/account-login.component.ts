import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { AccountPasswordInputType, AccountPasswordTipType } from '@nx-nest-postgre-manager/account';
import { AuthService } from '@nx-nest-postgre-manager/auth';

const KEY_DISPLAY_TITLE_MAP = new Map<string, string>(
  [
    ['userName', 'User Name'],
    ['password', 'Password']
  ]
);
@Component({
  selector: 'nx-nest-postgre-manager-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.scss'],
})
export class AccountLoginComponent {
  faUsers = faUsers;
  form: FormGroup;
  private showPassword = true;
  private errorStatusTextForServer = "";
  errorStatusTextList: string[] = [];
  
  get passwordInputType() {
    return this.showPassword ? AccountPasswordInputType.Password : AccountPasswordInputType.Text;
  }

  get passwordTip() {
    return this.showPassword ? AccountPasswordTipType.Show : AccountPasswordTipType.Hide;
  }
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.form = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  switchPasswordType() {
    this.showPassword = !this.showPassword;
  }

  errorMessage(): string[] {
    let errorStatusTextList = [];
    for (const field in this.form.controls) { 
      const control = this.form.get(field);    
      if (control?.touched && control?.invalid && control.hasError('required')) {
        errorStatusTextList.push(`${KEY_DISPLAY_TITLE_MAP.get(field)} is required`);
      }
    }

    if (this.errorStatusTextForServer) {
      errorStatusTextList.push(this.errorStatusTextForServer);
    }

    return errorStatusTextList;
  }

  onSubmit() {
    let userName = this.form.get('userName')?.value;
    let password = this.form.get('password')?.value;
    
    this.authService.Login(userName, password)
        .subscribe(
          (res: any) => {
            if (res) {
              this.errorStatusTextForServer = '';
              this.router.navigate(["/", "list"]);
            }
          },
          (err: HttpErrorResponse) => this.errorStatusTextForServer = err.statusText
        );
  }
}
