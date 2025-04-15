import { Injectable } from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class LogUpdateService {

  constructor(updates: SwUpdate) {
    updates.versionUpdates.subscribe((evt) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':

          break;
        case 'VERSION_READY':


          break;
        case 'VERSION_INSTALLATION_FAILED':

          break;
      }
    });
  }
}
