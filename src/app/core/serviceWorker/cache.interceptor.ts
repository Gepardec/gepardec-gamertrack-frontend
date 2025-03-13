import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {CacheStatusService} from './cacheStatus.service';
import {tap} from 'rxjs';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheStatusService = inject(CacheStatusService)

  if (!('caches' in window) || navigator.onLine) {
    return next(req);
  }

  cacheStatusService.checkCache(req.url);

  return next(req);
};
