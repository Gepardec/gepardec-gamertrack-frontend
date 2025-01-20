import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../user';

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
          console.log("Hier der User",user);
          this.user = user;
        },
        error: (error) => {
          console.log(error);
        }
      });

  }
  deleteUser(token: string){
    this.userService.deleteUser(token)
  }
}
