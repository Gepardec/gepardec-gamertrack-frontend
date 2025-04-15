import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgIf} from '@angular/common';
import {UserService} from '../../user.service';

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
