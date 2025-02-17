import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NotificationService} from '../notification.service';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit, OnDestroy {
  notificationMessage: string = '';
  notificationColorClass: string = '';
  private notificationSubscription!: Subscription;
  isVisible = false;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService.getNotification().subscribe(({ message, colorClass }) => {
      this.notificationMessage = message;
      this.notificationColorClass = colorClass;
      this.isVisible = true;

      setTimeout(() => {
        this.isVisible = false;
      }, 5000);
    });
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }

  closeNotification(): void {
    this.isVisible = false;
  }
}
