import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { UsersService } from 'src/service/users.service';




@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private userService: UsersService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.userService.isStaticLogged) {
            return true;
        } else {
            this.router.navigateByUrl('/login')
        }
    }


}