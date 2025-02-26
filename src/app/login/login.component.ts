import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import { AuthService } from '../core/auth/auth.service';
import {HttpResponse} from '@angular/common/http';
import {LoadingScreenComponent} from '../shared/ui/loading-screen/loading-screen.component';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf,
    LoadingScreenComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}


  onSubmit(): void {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password)
    }
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isLoading() {
    return this.authService.loading();
  }
}
