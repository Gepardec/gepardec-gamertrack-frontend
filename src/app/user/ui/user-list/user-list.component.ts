import {Component, Input, inject} from '@angular/core';
import {User} from '../../../core/models/user';
import {NgForOf, NgIf} from '@angular/common';
import {UserComponent} from '../../user.component';
import {UserService} from '../../user.service';
import {RouterModule} from '@angular/router';



@Component({
  selector: 'app-user-list',
  imports: [
    NgForOf,
    UserComponent,
    RouterModule,
    NgIf
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
