import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from '../../user.service';
import {User} from '../../../shared/models/user';
import {FormsModule} from '@angular/forms';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-update-user',
    imports: [
        RouterLink,
        FormsModule,
        NgIf
    ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  user: User = {} as User;
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
  updateUser(){
    console.log(this.user);
    this.userService.updateUser(this.userToken,this.user.firstname,this.user.lastname,this.user.deactivated);
  }
}
