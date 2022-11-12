import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { AccountPasswordInputType, AccountPasswordTipType } from './service/account.domain';

@Component({
  selector: 'nx-nest-postgre-manager-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.scss'],
})
export class AccountLoginComponent implements OnInit {
  faUsers = faUsers;
  loginForm: FormGroup;
  private showPassword = true;
  
  get passwordInputType() {
    return this.showPassword ? AccountPasswordInputType.Password : AccountPasswordInputType.Text;
  }

  get passwordTip() {
    return this.showPassword ? AccountPasswordTipType.Show : AccountPasswordTipType.Hide;
  }
  
  constructor() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  switchPasswordType() {
    console.log(123)
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {}
  

  onSubmit() {
  }
}
