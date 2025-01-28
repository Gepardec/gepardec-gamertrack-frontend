import { Injectable } from '@angular/core';
import {User} from './user';
import {HttpClient, HttpParams} from "@angular/common/http";
import {config, Observable} from 'rxjs';
import { Router } from '@angular/router';
import {ConfigService} from './shared/config.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url ='/api/users'

  constructor(private httpClient: HttpClient, private router: Router, private configService:ConfigService) { }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.configService.getBackendUrlWithContext(`${this.url}`));
  }

  getAllActivatedUsers() {
    return this.httpClient.get<User[]>(this.configService.getBackendUrlWithContext(`${this.url}`), { params: new HttpParams().set('includeDeactivated', false)})
  }

  getUserBytoken(token: string): Observable<User> {
    console.log("Hier der UserToken",token);
    return this.httpClient.get<User>(this.configService.getBackendUrlWithContext(`${this.url}/${token}`));
  }

  createUser(firstname: string, lastname: string){
    const body = { firstname, lastname };

    this.httpClient.post(this.configService.getBackendUrlWithContext(`${this.url}/`), body).subscribe(response => {
      console.log('User created successfully:', response);
      this.router.navigate(['users']);
    }, error => {
      console.error('Error creating user:', error);
    });
  }

  deleteUser(token: string){
    this.httpClient.delete(this.configService.getBackendUrlWithContext(`${this.url}/${token}`)).subscribe(response => {
      console.log('User deleted successfully:', response);
      this.router.navigate(['users']);


    }, error => {
      console.error('Error deleting user:', error);
      console.error('Error deleting user:', token);
      console.error(this.configService.getBackendUrlWithContext(`${this.url}/${token}`));
      this.router.navigate(['users']);
    });
  }

  updateUser(token: string, firstname: string, lastname: string, deactivated: boolean) {
    const body = {firstname, lastname, deactivated};

    this.httpClient.put(this.configService.getBackendUrlWithContext(`${this.url}/${token}`), body).subscribe(response => {
      console.log('User created successfully:', response);
      this.router.navigate(['users']);
    }, error => {
      console.error('Error creating user:', error);
    });

  }

}
