import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  http = inject(HttpClient)

  constructor() { }


  private getBackendUrl(): string {
    return window.location.origin.replace(environment.frontendOriginSegment, environment.backendOriginSegment)
  }

  getBackendUrlWithContext(context: String) {
    return this.getBackendUrl() + context.replace("/api", "/gepardec-gamertrack/api/v1");
  }



}


