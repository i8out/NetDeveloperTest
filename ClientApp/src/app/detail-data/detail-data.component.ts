import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { UserModel } from '../models/user-model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-detail-data',
  templateUrl: './detail-data.component.html',
  styleUrls: ['./detail-data.component.css']
})
export class DetailDataComponent implements OnInit {
  @ViewChild('f', { static: false }) form: any;
  user = new UserModel();

  firstName = new FormControl(this.data.firstName, [Validators.required]);
  lastName = new FormControl(this.data.lastName, [Validators.required]);
  password = new FormControl(this.data.password, [Validators.required]);

  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogref: MatDialogRef<DetailDataComponent>
  ) { }

  ngOnInit() { }

  update() {
    this.user.id = this.data.id;
    this.user.firstName = this.firstName.value;
    this.user.lastName = this.lastName.value;
    this.user.password = this.password.value;
    this.userService.updateUser(this.user).subscribe((res: any) => {
    }, (err) => console.error(err), () => this.savingDone());

  }

  delete() {
    this.user.id = this.data.id;
    this.userService.deleteUser(this.user).subscribe((res: any) => {
    }, (err) => console.error(err), () => this.savingDone());

  }

  savingDone(): void {
    this.dialogref.close('From Dialog');
  }
}
