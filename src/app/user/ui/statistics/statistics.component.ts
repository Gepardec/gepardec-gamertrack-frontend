import {Component, inject, Input, OnInit} from '@angular/core';
import {User} from '../../../core/models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../user.service';
import {routes} from '../../../app.routes';

@Component({
  selector: 'app-statistics',
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{

  router  = inject(Router)
  route  = inject(ActivatedRoute)
  userService = inject(UserService);

  user?: User;


  ngOnInit(): void {

    let routeExtras = this.router.lastSuccessfulNavigation?.extras.state;


    if(!routeExtras){
      this.userService.getUserBytoken(this.route.snapshot.params['token']).subscribe({
        next: user => {
          this.user = user;
        },
        error: err => {
          this.router.navigate(['/users']);
        }
      });
    } else {
      this.user = (routeExtras as User[]) [0];
    }
  }
}
