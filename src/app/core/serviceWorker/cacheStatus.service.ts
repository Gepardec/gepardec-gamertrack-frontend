import {inject, Injectable, signal} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {NotificationService} from '../notification/notification.service';


const CACHE_USED_MESSAGE = 'Cached data is being used';

@Injectable({
  providedIn: 'root'
})
export class CacheStatusService {

  notificationService = inject(NotificationService);


  async checkCache(url: string) {
    if (
      await Promise.any((await caches.keys())
        .map(name => caches.open(name)
          .then(cache => cache.match(url))))) {
      this.notificationService.showNotification(CACHE_USED_MESSAGE, 'warning');
    }
  }
}
