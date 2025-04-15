import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new Subject<{ message: string, colorClass: string }>();

  constructor() { }

  showNotification(message: string, colorClass: string) {
    this.notificationSubject.next({ message, colorClass });
  }

  getNotification() {
    return this.notificationSubject.asObservable();
  }
}
