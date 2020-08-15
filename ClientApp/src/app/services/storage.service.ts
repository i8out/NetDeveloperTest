import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async store(storageKey: string, value: any){
    const encryptedValue = atob(value);
    sessionStorage.setItem(storageKey, encryptedValue);
  }

  async get(storageKey: string){
    const resp = await sessionStorage.getItem(storageKey);
    if(resp){
      return btoa(resp);
    } else{
      return false;
    }
  }

  async removeItem(storageKey: string){
    // not yet implemented
  }

  async clear(){
    await sessionStorage.clear();
  }
}
