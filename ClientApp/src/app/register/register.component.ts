import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserModel } from '../models/user-model';
import { FormBuilder, FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f', { static: false }) form: any;
  user = new UserModel();

  registerForm: FormGroup = this.formBuilder.group({
    firstName: [, { validators: [Validators.required], updateOn: "change" }],
    lastName: [, { validators: [Validators.required], updateOn: "change" }],
    email: [, { validators: [Validators.required, Validators.email], updateOn: "change", }]
  });

  passwordsForm: FormGroup = this.formBuilder.group({
    password: ['', { validators: [Validators.required] }],
    confirmPassword: ['', { validators: [Validators.required] }]
  }, { validators: this.passwordConfirming('password', 'confirmPassword') });

  passwordConfirming(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let pass = group.get('password').value;
      let confirmPass = group.get('confirmPassword').value;
      return pass === confirmPass ? null : { notSame: true }
    };
  }


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogref: MatDialogRef<RegisterComponent>) { }

  ngOnInit() {
  }

  update() {

    this.user.firstName = this.registerForm.get('firstName').value;
    this.user.lastName = this.registerForm.get('lastName').value;
    this.user.password = this.passwordsForm.get('password').value;
    this.user.email = this.registerForm.get('email').value;

    this.userService.getLoginCredentials(this.user).subscribe(result => {
      if (result) {
        this.duplicateError();
      }
      // else {
      //   this.userService.updateUser(this.user).subscribe((res: any) => {
      //   }, (err) => console.error(err), () => this.savingDone());
      // }
    }, (err) => this.userService.updateUser(this.user).subscribe((res: any) => { }, (err) => console.error(err), () => this.savingDone()));
  }

  savingDone(): void {
    this.dialogref.close('From Dialog');
  }

  duplicateError(): void {
    alert("Email already Registered!");
  }
}
