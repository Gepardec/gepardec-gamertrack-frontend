import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HealthService {
  private http = inject(HttpClient);
  private config = inject(ConfigService);

  private dbDownSubject = new BehaviorSubject<boolean>(false);

  isDbDown(): boolean {
    return this.dbDownSubject.getValue();
  }

  setDbDown(down: boolean): void {
    this.dbDownSubject.next(down);
  }

  getDbDown$(): Observable<boolean> {
    return this.dbDownSubject.asObservable();
  }

  checkDatabaseHealth(): Observable<any> {
    const url = this.config.getBackendUrlWithContext('/api/health');
    return this.http.get(url, { responseType: 'text' }).pipe(
      tap(() => this.setDbDown(false)),
      catchError(err => {
        // On any error (e.g., 503) mark DB as down; let interceptor handle notification
        this.setDbDown(true);
        return throwError(() => err);
      })
    );
  }
}
