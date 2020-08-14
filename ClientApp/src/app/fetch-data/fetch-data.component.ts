import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { UserModel } from '../models/user-model';

@Component({
  selector: 'app-fetch-data',
  styleUrls: ['./fetch-data.component.css'],
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public users: UserModel[];
  resultsLength: number;

  displayedColumns = ['email', 'fullName'];
  datasource: MatTableDataSource<UserModel>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
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
  }
}