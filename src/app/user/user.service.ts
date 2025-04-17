import {Injectable} from '@angular/core';
import {User} from '../core/models/user';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ConfigService} from '../core/config/config.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = '/api/users'

  constructor(private httpClient: HttpClient, private router: Router, private configService: ConfigService) {
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.configService.getBackendUrlWithContext(`${this.url}`));
  }

  getAllActivatedUsers() {
    return this.httpClient.get<User[]>(this.configService.getBackendUrlWithContext(`${this.url}`), {params: new HttpParams().set('includeDeactivated', false)})
  }

  getUserBytoken(token: string): Observable<User> {

    return this.httpClient.get<User>(this.configService.getBackendUrlWithContext(`${this.url}/${token}`));
  }

  createUser(firstname: string, lastname: string) {
    const body = {firstname, lastname};

    this.httpClient.post(this.configService.getBackendUrlWithContext(`${this.url}`), body)
      .subscribe(() => this.router.navigate(['users']));
  }

  deleteUser(token: string) {
    this.httpClient.delete(this.configService.getBackendUrlWithContext(`${this.url}/${token}`)).subscribe({
      next: () => {
        this.router.navigate(['users']);
      },
      error: () => {
        this.router.navigate(['users']);
      }});
  }

    updateUser(token
  :
    string, firstname
  :
    string, lastname
  :
    string, deactivated
  :
    boolean
  )
    {
      const body = {firstname, lastname, deactivated};

      this.httpClient.put(this.configService.getBackendUrlWithContext(`${this.url}/${token}`), body).subscribe(() => {

          this.router.navigate(['users']);
        }
      );

    }

  }
