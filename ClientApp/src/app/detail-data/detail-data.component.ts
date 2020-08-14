import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material";
import { FormControl, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-detail-data',
  templateUrl: './detail-data.component.html',
  styleUrls: ['./detail-data.component.css']
})
export class DetailDataComponent implements OnInit {
  @ViewChild('f'                    , { static: false }) form: any;

  firstName = new FormControl(this.data.firstName, [Validators.required]);
  lastName = new FormControl(this.data.lastName, [Validators.required]);
  password = new FormControl(this.data.password, [Validators.required]);
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogref: MatDialogRef<DetailDataComponent>
  ) { }

  ngOnInit() {

  }

  update() {
    console.log('update');
    console.log(this.form);
    console.log('update frm');
    console.log(this.firstName.invalid);
  }

  delete() {
    console.log('delete');
    console.log(this.form);
    console.log('delete frm');
  }
}
