import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async store(storageKey: string, value: string){
    const encryptedValue = btoa(value);
    sessionStorage.setItem(storageKey, encryptedValue);
  }

  async get(storageKey: string){
    const resp = await sessionStorage.getItem(storageKey);
    if(resp){
      return atob(resp);
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
