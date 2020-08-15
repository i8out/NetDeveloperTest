import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserModel } from '../models/user-model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f', { static: false }) form: any;
  user = new UserModel();

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);

  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogref: MatDialogRef<RegisterComponent>
  ) { }

  ngOnInit() {
  }

  update() {
    this.user.firstName = this.firstName.value;
    this.user.lastName = this.lastName.value;
    this.user.password = this.password.value;
    this.user.email = this.email.value;
    this.userService.updateUser(this.user).subscribe((res: any) => {
    }, (err) => console.error(err), () => this.savingDone());

  }

  savingDone(): void {
    this.dialogref.close('From Dialog');
  }

  checkPasswords() {
    let firstPassword = this.password.value;
    let secndPassword = this.confirmPassword.value;
    return firstPassword === secndPassword ? null : { notSame: true };
  }

}
