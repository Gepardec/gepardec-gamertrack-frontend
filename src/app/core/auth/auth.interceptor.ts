import {HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpHandlerFn} from '@angular/common/http';
import { Observable } from 'rxjs';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const clonedReq = req.clone({
    setHeaders: {Authorization: `Bearer ${localStorage.getItem('authToken')}`}
  });

  return next(clonedReq);
}
