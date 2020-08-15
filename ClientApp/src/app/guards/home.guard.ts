import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Constants } from '../models/constants';

@Injectable({
    providedIn: 'root'
})
export class HomeGuard implements CanActivate {

    constructor(private storageService: StorageService,
        private router: Router) { }

    canActivate(): Promise<boolean> {
        return new Promise(resolve => {
            resolve(true);
            this.storageService.get(Constants.AUTH).then(res => {
                if (res) {
                    resolve(true);
                } else {
                    this.router.navigate(['error404']);
                    resolve(false);
                }
            }).catch(err => {
                resolve(false);
            });
        });
    }
}