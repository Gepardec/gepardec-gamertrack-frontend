import {CanActivate, CanActivateChild, CanActivateFn, Router} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthGuard implements CanActivate, CanActivateChild {

  authService = inject(AuthService);
  router = inject(Router);


  canActivate(): boolean {
    return this.isAuthenticated();
  }

  canActivateChild(): boolean {
    return this.isAuthenticated();
  }


  private isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
