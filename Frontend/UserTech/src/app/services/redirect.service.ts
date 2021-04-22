import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  private HOME_PATH = 'rental/home';
  private LOGIN_PATH = 'login';

  constructor(private router: Router, private location: Location) {
  }

  redirectToHome(): Promise<boolean> {
    return this.router.navigate([this.HOME_PATH]);
  }

  redirectToLogin(): Promise<boolean> {
    return this.router.navigate([this.LOGIN_PATH]);
  }

  goBack(): void {
    return this.location.back();
  }

  reload(): Promise<boolean> {
    const currentUrl = this.router.url;
    return this.router.navigateByUrl('/rental', {skipLocationChange: true})
      .then(() => this.router.navigateByUrl(currentUrl));
  }
}
