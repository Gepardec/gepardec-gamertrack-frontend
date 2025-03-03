import { Injectable } from '@angular/core';
import {SwUpdate, VersionReadyEvent} from '@angular/service-worker';
import {filter, map} from 'rxjs';

  function promptUser(event: VersionReadyEvent): boolean {
    return window.confirm(`New version available! Load new version?`);
  }


@Injectable({
  providedIn: 'root'
})
export class PromptUpdate {

  constructor(swUpdate: SwUpdate) {
    swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe((evt) => {
        if (promptUser(evt)) {
          // Reload the page to update to the latest version.
          document.location.reload();
        }
      });

    const updatesAvailable = swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      map((evt) => ({
      type: 'UPDATE_AVAILABLE',
      current: evt.currentVersion,
      available: evt.latestVersion,
    })),
  );
  }


}
