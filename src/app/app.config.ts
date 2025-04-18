import {ApplicationConfig, provideZoneChangeDetection, isDevMode, ChangeDetectorRef} from '@angular/core';
import {provideRouter} from '@angular/router';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http'


import {routes} from './app.routes';
import {NotificationInterceptor} from './core/notification/notification.interceptor';
import {NotificationService} from './core/notification/notification.service';
import {provideServiceWorker} from '@angular/service-worker';
import {PromptUpdate} from './core/serviceWorker/promptUpdate';
import {CacheStatusService} from './core/serviceWorker/cacheStatus.service';
import {LogUpdateService} from './core/serviceWorker/logUpdate.service';
import {authInterceptor} from './core/auth/auth.interceptor';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {provideCharts} from 'ng2-charts';
import {
  CategoryScale,
  Colors,
  Legend,
  LinearScale,
  LineController,
  LineElement, PointElement
} from 'chart.js';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptors([NotificationInterceptor, authInterceptor])),
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    NotificationService,
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    LogUpdateService,
    CacheStatusService,
    PromptUpdate,
    provideCharts({registerables: [LineController, CategoryScale, Legend, Colors, LinearScale, LineElement, PointElement]}),
  ]
};
