import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

import { UserModel } from '../models/user-model';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
import { Constants } from '../models/constants';
import { UserAuthorities } from '../models/user-authorities';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  @ViewChild('f', { static: false }) form: any;
  login = new UserModel();
  user = new UserModel();
  sessionKey = new UserAuthorities();
  hide: boolean = true;
  loginValid: boolean = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private storageService: StorageService,
    private userService: UserService) { }

  clickLogin() {
    this.login.email = this.email.value;
    this.login.password = this.password.value;
    this.userService.getLoginCredentials(this.login).subscribe(result => {
      this.user = JSON.parse(JSON.stringify(result));
      console.log(this.user);
      if (this.login.email.toLowerCase() == this.user.email.toLowerCase()
        && this.login.password == this.user.password) {
        this.loginValid = true;
        this.sessionKey.password = this.user.password;
        if (this.user.superAdmin) {
          this.sessionKey.role = 'ADMIN';
        } else {
          this.sessionKey.role = 'USER';
        }
        this.storageService.store(Constants.AUTH, this.sessionKey.role);
        this.router.navigate(['counter']);
      } else {
        this.loginValid = false;
      }

    });
  }

  register() {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    let dialogRef = this.dialog.open(RegisterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.dialogClosed();
    });

  }

  dialogClosed() {
    // to be implemented
  }

}
