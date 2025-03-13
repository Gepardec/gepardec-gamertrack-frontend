import {inject, Injectable, signal} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {NotificationService} from '../notification/notification.service';


const CACHE_USED_MESSAGE = 'Cached data is being used';

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService {

  notificationService = inject(NotificationService);

  constructor(private swUpdate: SwUpdate) {
    if (swUpdate.isEnabled) {
      navigator.serviceWorker?.addEventListener('fetch', (event: any) => {
        if (event?.request?.url.includes('/api/v1/matches') || event?.request?.url.includes('/api/v1/ranklist'))

          event.respondWith(
            caches.match(event.request).then((response) => {
              if (response) {
                this.notificationService.showNotification(CACHE_USED_MESSAGE, 'warning');
              } else {
              }
              return response || fetch(event.request);
            })
          );
      })
    }
  }
}
