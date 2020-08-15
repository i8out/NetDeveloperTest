import { Constants } from '../models/constants';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { UserModel } from '../models/user-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$ = new BehaviorSubject<any>('');
  constructor(private storageService: StorageService,
    private router: Router) { }

    getUserData(){
      this.storageService.get(Constants.AUTH).then(result => {
        this.userData$.next(result);
      });
    }

    // login(postData: any): any {
    //   const result = this.userList.find(({ username, password }) => username === postData.username && password === postData.password);
    //   if(result){
    //     return result;
    //   }
    //   return '';
    // }

    logout(){
      this.storageService.clear();
      this.userData$.next('');
      this.router.navigate(['']);
    }

    getUsers(){
      return this.userList;
    }

    signup(userList: any){
      this.storageService.removeItem(Constants.AUTH);
      this.storageService.store(Constants.AUTH, userList);
    }

    userList: UserModel[] = [];
}
