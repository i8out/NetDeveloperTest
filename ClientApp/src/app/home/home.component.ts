import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

import { UserModel } from '../models/user-model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  @ViewChild('f', { static: false }) form: any;
  login = new UserModel();
  user = new UserModel();
  hide: boolean = true;
  loginValid: boolean = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(private userService: UserService) { }

  clickLogin() {
    this.login.email = this.email.value;
    this.login.password = this.password.value;
    this.userService.getLoginCredentials(this.login).subscribe(result => {
      console.log(result);
      this.user = result;
      if (this.login.email == this.user.email
        && this.login.password == this.user.password) {
        this.loginValid = true;
      } else {
        this.loginValid = false;
      }

    });
  }

}
