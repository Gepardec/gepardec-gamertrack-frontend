import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserComponent} from '../user/user.component';
import {RouterModule, RouterOutlet} from '@angular/router';
import {UserService} from '../user.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule, RouterModule, FormsModule, NgIf],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  firstname: string = '';
  lastname: string = '';

  userService = inject(UserService);

  submitCreateUser(): void{
    if (this.firstname && this.lastname) {
      this.userService.createUser(this.firstname ?? '', this.lastname ?? '')
    }
  }
}
