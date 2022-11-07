import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nx-nest-postgre-manager-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.scss'],
})
export class AccountLoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  
  onSubmit() {
  }
}
