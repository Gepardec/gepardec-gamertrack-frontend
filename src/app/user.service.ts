import { Injectable } from '@angular/core';
import {User} from './user';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url ='/api/users'

  constructor(private httpClient: HttpClient, private router: Router) { }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.url}`);
  }

  getUserBytoken(token: string): Observable<User> {
    console.log("Hier der UserToken",token);
    return this.httpClient.get<User>(`${this.url}/${token}`);
  }

  createUser(firstname: string, lastname: string){
    const body = { firstname, lastname };

    this.httpClient.post(`${this.url}/`, body).subscribe(response => {
      console.log('User created successfully:', response);
      this.router.navigate(['users']);
    }, error => {
      console.error('Error creating user:', error);
    });
  }

  deleteUser(token: string){
    this.httpClient.delete(`${this.url}/${token}`).subscribe(response => {
      console.log('User deleted successfully:', response);
      this.router.navigate(['users']);


    }, error => {
      console.error('Error deleting user:', error);
      console.error('Error deleting user:', token);
      console.error(`${this.url}/${token}`);
      this.router.navigate(['users']);
    });
  }

  updateUser(token: string, firstname: string, lastname: string, deactivated: boolean) {
    const body = {firstname, lastname, deactivated};

    this.httpClient.put(`${this.url}/${token}`, body).subscribe(response => {
      console.log('User created successfully:', response);
      this.router.navigate(['users']);
    }, error => {
      console.error('Error creating user:', error);
    });

  }

}
