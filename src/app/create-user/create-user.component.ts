import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserComponent} from '../user/user.component';
import {RouterModule, RouterOutlet} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
 applyForm = new FormGroup({
   firstname: new FormControl("", Validators.required),
   lastname: new FormControl("", Validators.required),
 })
  userService = inject(UserService);

  submitCreateUser(){
    this.userService.createUser(this.applyForm.value.firstname ?? '', this.applyForm.value.lastname ?? '')
  }
}
