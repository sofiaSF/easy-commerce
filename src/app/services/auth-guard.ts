import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LoginService } from './login-service.service';

@Injectable()
export class AuthGuard implements CanActivate {

    user:any;
    constructor(private authService: LoginService, private router: Router) {
        this.user = null;
        this.subscribeService();
    }

    subscribeService(){
        this.authService.user$.subscribe(user  => this.user = user);
    }

    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        if (!this.user) {
            this.router.navigate(["/login"]);
            return false;
        }
        return true;
    }
}
