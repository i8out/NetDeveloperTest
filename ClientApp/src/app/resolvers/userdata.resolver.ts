import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UserDataResolver {
    constructor(private authService: AuthService) { }

    resolve() {
        return this.authService.getUserData();
    }
}