import { UserService } from './../services/user.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';

import { UserModel } from '../models/user-model';
import { DetailDataComponent } from '../detail-data/detail-data.component';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';

@Component({
  selector: 'app-fetch-data',
  styleUrls: ['./fetch-data.component.css'],
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public users: any;
  resultsLength: number;
  dialogdata = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  };

  displayedColumns = ['email', 'fullName'];
  datasource: MatTableDataSource<UserModel>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private dialog: MatDialog,
    private userService: UserService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.userService.getAllUsers().subscribe(result => {
      console.log(result);
      this.users = result;
      this.resultsLength = this.users.length;
      this.datasource = new MatTableDataSource(this.users);
      this.datasource.paginator = this.paginator;
    });
  }

  editUser(e) {
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
    let dialogRef = this.dialog.open(DetailDataComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.dialogClosed();
    });

  }

  dialogClosed() {
    this.ngOnInit();
  }
}