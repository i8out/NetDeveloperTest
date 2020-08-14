import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user-model';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public users: UserModel[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<UserModel[]>(baseUrl + 'api/users').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }

  editUser(e){
    console.log(e);
  }
}