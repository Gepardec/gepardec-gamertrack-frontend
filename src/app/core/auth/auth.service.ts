import {computed, DestroyRef, effect, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ConfigService} from '../config/config.service';
import {AuthResponse} from './auth-response';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
  configService = inject(ConfigService);
  httpClient = inject(HttpClient);
  router = inject(Router);

  private accessTokenKey = 'authToken';
  private storedTokenBrowser = localStorage.getItem(this.accessTokenKey);
  private state = signal<AuthenticationState>({
    token: this.storedTokenBrowser,
    isAuthenticated: this.storedTokenBrowser !== null,
    loading: false,
  });

  token = computed(() => this.state().token);
  loading = computed(() => this.state().loading);
  isAuthenticated = computed(() => this.state().isAuthenticated);

  constructor() {
    effect(() => {
      const token = this.token();
      if (token !== null) {
        localStorage.setItem(this.accessTokenKey, token);
        this.validateToken(token);
      } else {
        localStorage.removeItem(this.accessTokenKey);
      }
    });

    if (this.storedTokenBrowser) {
      this.validateToken(this.storedTokenBrowser);
    }
  }

  login(username: string, password: string) {
    this.state.update((state) => {
      return {...state, loading: true}
    });
    const body = {username, password};

    return this.httpClient.post<AuthResponse>(this.configService.getBackendUrlWithContext(`${this.loginUrl}`), body)
      .pipe(takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: (authResponse) => {
          if (authResponse) {
            this.state.set({
              token: authResponse.token,
              isAuthenticated: true,
              loading: false
            });
          }
          this.router.navigate([''])
        },
        error: () => {
          this.state.update((state) => {
            return {...state, loading: false}
          });
        }
      });
  }

  logout() {
    this.state.set({
      token: null,
      isAuthenticated: false,
      loading: false
    });
  }

  validateToken(token
                :
                string
  ) {
    if (!this.isValidJWT(token)) {
      this.state.update((s) => ({...s, isAuthenticated: false}));
      return;
    }

    this.httpClient.post<HttpResponse<any>>(
      this.configService.getBackendUrlWithContext('/api/auth/validate'),
      {token},
      {observe: 'response'}
    ).subscribe({
      next: (response: HttpResponse<any>) => {
        this.state.update((s) => ({...s, isAuthenticated: response.status === 200}));
      },
      error: () => {
        this.state.update((s) => ({...s, isAuthenticated: false}));
      }
    });
  }

  isValidJWT(token
             :
             string
  ) {
    if (!token) return false;
    const parts = token.split('.');
    return parts.length === 3;
  }
}
