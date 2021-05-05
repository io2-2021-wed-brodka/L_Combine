import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../dto/authenticate-response-dto';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class TechGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const role = this.loginService.getRole()
      if (role === Role.Tech || role === Role.Admin) {
        return true;
      } else {
        return this.router.parseUrl('/rental/home');
      }
  }
  
}
