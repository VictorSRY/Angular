import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../login/other/auth.service';

@Injectable({
    providedIn:'root'
})
export class GurdService implements CanActivate{
    constructor(private router:Router, private authS:AuthService){}

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
        return this.authS.userAuth.pipe( take(1), map((user)=>{if(!!user)return true;else return this.router.createUrlTree(['login'])}) )
    }
}