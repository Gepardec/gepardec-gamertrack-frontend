import {Component, inject, Input} from '@angular/core';
import {User} from '../shared/models/user';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-user',
    imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() user!: User
}

