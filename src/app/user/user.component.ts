import {Component, Input} from '@angular/core';
import {User} from '../core/models/user';
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

