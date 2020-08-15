import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async store(storageKey: string, value: any){
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    sessionStorage.setItem(storageKey, value);
  }

  async get(storageKey: string){
    const resp = await sessionStorage.getItem(storageKey);
    if(resp){
      return JSON.parse(unescape(atob(resp)));
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
