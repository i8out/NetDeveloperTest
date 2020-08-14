import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

import { UserModel } from '../models/user-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  @ViewChild('f', { static: false }) form: any;
  login = new UserModel();
  hide: boolean = true;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  clickLogin() {

  }

}
