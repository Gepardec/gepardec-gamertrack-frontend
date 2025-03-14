import {Component, Input, inject} from '@angular/core';
import {User} from '../user';
import {NgForOf} from '@angular/common';
import {UserComponent} from '../user/user.component';
import {UserService} from '../user.service';
import {RouterModule} from '@angular/router';



@Component({
  selector: 'app-user-list',
  imports: [
    NgForOf,
    UserComponent,
    RouterModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @Input() users: User[] = [];
  userService: UserService = inject(UserService);
  protected readonly UserComponent = UserComponent;

  constructor() {
   this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }
}
