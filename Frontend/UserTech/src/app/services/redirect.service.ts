import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router, private location: Location) {
  }

  redirectToHome(): void {
    this.router.navigate(['home']);
  }

  redirectToLogin(): void {
    this.router.navigate(['login']);
  }

  goBack(): void {
    this.location.back();
  }
}
