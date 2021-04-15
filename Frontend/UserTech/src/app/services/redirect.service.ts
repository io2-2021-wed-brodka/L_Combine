import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router) {
  }

  redirectToHome(): void {
    this.router.navigate(['home']);
  }

  redirectToLogin(): void {
    this.router.navigate(['login']);
  }
}
