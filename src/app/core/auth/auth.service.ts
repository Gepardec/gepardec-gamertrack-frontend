import {computed, DestroyRef, effect, inject, Injectable, signal, untracked} from '@angular/core';
import {BehaviorSubject, catchError} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ConfigService} from '../../shared/service/config.service';
import {AuthResponse} from './auth-response';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {JwtHelperService} from '@auth0/angular-jwt';

type AuthenticationState = {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = '/api/auth/login';
  destroyRef = inject(DestroyRef);
  jwtHelper = inject(JwtHelperService);

  private accessTokenKey = 'authToken';
  private storedToken = localStorage.getItem(this.accessTokenKey);
  private state = signal<AuthenticationState>({
    token: this.storedToken,
    isAuthenticated: this.isTokenValid(this.storedToken),
    loading: false,
  });

  token = computed(() => this.state().token);
  loading = computed(() => this.state().loading);
  isAuthenticated = computed(() => this.state().isAuthenticated);

  private authTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private httpClient: HttpClient, private router: Router, private configService: ConfigService) {
    effect(() => {
      const token = this.token();
      if (token !== null) {
        localStorage.setItem(this.accessTokenKey, token);
      } else {
        localStorage.removeItem(this.accessTokenKey);
      }
    });

  }

  login(username: string, password: string) {
    this.state.update((state) => {
      return {...state, loading: true}
    });
    const body = {username, password};
    console.log('Trying to login');
    return this.httpClient.post<AuthResponse>(this.configService.getBackendUrlWithContext(`${this.loginUrl}`), body)
      .pipe(takeUntilDestroyed(this.destroyRef)
      ).subscribe(
        (authResponse) => {
          if (authResponse) {
            this.state.set({
              token: authResponse.token,
              isAuthenticated: true,
              loading: false
            });
          }
          this.router.navigate([''])
        },
        (error) => {
          this.state.update((state) => {
            return {...state, loading: false}
          });
          console.error('Login failed', error);
        }
      );
  }

  logout() {
    this.state.set({
      token: null,
      isAuthenticated: false,
      loading: false
    });
  }

  isTokenValid(token: string | null): boolean {
    if (this.isValidJWT(token)) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  isValidJWT(token: string | null): boolean {
    if (!token) return false;

    const parts = token.split('.');
    return parts.length === 3;
  }
}
