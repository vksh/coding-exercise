import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from "@angular/router";
import { AuthenticationService } from './services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AppRouteGuard implements CanActivate {

    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/login');
            this.authService.deleteToken();
            return false;
        }
        return true;
    }
}
