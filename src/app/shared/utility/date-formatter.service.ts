import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  constructor() { }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const currentDate = new Date();

    const daysDifference = currentDate.getDate() - date.getDate();

    if (daysDifference < 7) {
      if(daysDifference == 0){
        return `today`;
      }else {
        return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
      }
    } else {
      return date.toLocaleDateString('en-GB', { weekday: 'short', month: 'numeric', day: 'numeric' });
    }

  }
}
