import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {UserService} from '../../user.service';
import {User} from '../../../core/models/user';

@Component({
  selector: 'app-user-details',
  imports: [
    RouterLink
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  user: User | undefined;
  userToken = "";
  constructor() {
    this.userToken = String(this.route.snapshot.params['token']);
    this.userService.getUserBytoken(this.userToken)
      .subscribe({
        next: (user) => {

          this.user = user;
        },
      });

  }
  deleteUser(token: string){
    this.userService.deleteUser(token)
  }
}
