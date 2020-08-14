import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private cs: CommonService,
    @Inject('BASE_URL') public baseUrl: string) { }

  public getAllUsers(): Observable<any> {
    let url = this.baseUrl + 'api/users';
    return this.cs.Get(url);
  }

  public updateUser(formData: any): Observable<any> {
    let url = this.baseUrl + 'api/users';
    let body = JSON.stringify(formData);
    return this.cs.Post(url, body);
  }

  public deleteUser(formData: any): Observable<any> {
    let url = this.baseUrl + 'api/users/' + formData.id;
    let body = JSON.stringify(formData);
    return this.cs.Delete(url);
  } 
}