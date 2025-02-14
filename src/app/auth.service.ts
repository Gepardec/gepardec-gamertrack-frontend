import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Authcredential} from './authcredential';
import {Router} from '@angular/router';
import {ConfigService} from './shared/config.service';
import {routes} from './app.routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = '/api/auth/login';
  token: string = '';


  private authTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private httpClient: HttpClient, private router: Router, private configService:ConfigService) { }

  login(username: string, password: string) {
    const body = { username, password };
    console.log('Trying to login');
    return this.httpClient.post<HttpResponse<any>>(this.configService.getBackendUrlWithContext(`${this.loginUrl}`), body,{ observe: 'response' })
      .pipe(
        catchError(error => {
          console.error('Login failed', error);
          throw error;
        })
      ).subscribe(
        (response) => {
          if (response.headers) {
            const authHeader = response.headers.get('Authorization');
            if (authHeader && authHeader.startsWith('Bearer ')) {
              this.token = authHeader.slice(7);
            }
          }
          this.saveToken(this.token);
          console.log('Login successful!');
          this.router.navigate([''])
        },
        (error) => {
          console.error('Login failed', error);
        }
      );

  }


  saveToken(token: string) {
    localStorage.setItem('authToken', token);
    this.authTokenSubject.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('authToken');
    this.authTokenSubject.next(null);
  }
}
