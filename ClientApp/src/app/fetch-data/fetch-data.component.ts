import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';

import { UserModel } from '../models/user-model';
import { DetailDataComponent } from '../detail-data/detail-data.component';

@Component({
  selector: 'app-fetch-data',
  styleUrls: ['./fetch-data.component.css'],
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public users: UserModel[];
  resultsLength: number;
  dialogdata={
    id:'',
    email:'',
    firstName:'',
    lastName:'',
    password:''
  };

  displayedColumns = ['email', 'fullName'];
  datasource: MatTableDataSource<UserModel>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private dialog: MatDialog, 
    http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<UserModel[]>(baseUrl + 'api/users').subscribe(result => {
      this.users = result;
      this.resultsLength = this.users.length;
      this.datasource = new MatTableDataSource(this.users);
      this.datasource.paginator = this.paginator;
    }, error => console.error(error));
  }
  
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

  editUser(e){
    console.log(e);
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    this.dialogdata.id = e.id;
    this.dialogdata.email = e.email;
    this.dialogdata.firstName = e.firstName;
    this.dialogdata.lastName = e.lastName;
    this.dialogdata.password = e.password;

    dialogConfig.data = this.dialogdata;
    let dialogRef = this.dialog.open(DetailDataComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.dialogClosed();
    });

  }

  dialogClosed() {
    // for implementation
  }
}