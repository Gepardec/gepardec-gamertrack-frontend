import {ChangeDetectorRef, Component, inject, Input, OnInit} from '@angular/core';
import {User} from '../../../core/models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../user.service';
import {MatchService} from '../../../match/match.service';
import {BaseChartDirective} from 'ng2-charts';
import {ChartData, ChartOptions, ChartType} from 'chart.js';
import {Match} from '../../../core/models/match';

@Component({
  selector: 'app-statistics',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {

  router = inject(Router)
  route = inject(ActivatedRoute)
  userService = inject(UserService);
  matchService = inject(MatchService);
  matchesPerDay: Record<string, number> = {};
  matchesPerDayWon: Record<string, number> = {};

  user?: User;
  chartType: ChartType = 'line'
  data: ChartData = {
    labels: [],
    datasets: []
  }
  chartOptions: ChartOptions = {
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      beginAtZero: true
      },
    }
  }


  ngOnInit(): void {
    let routeExtras = this.router.lastSuccessfulNavigation?.extras.state;

    const userObservable = routeExtras
      ? Promise.resolve((routeExtras as User[])[0])
      : this.userService.getUserBytoken(this.route.snapshot.params['token']).toPromise();

    userObservable.then(user => {
      this.user = user;

      this.matchService.getAllMatches().subscribe({
        next: matches => {

          const matchesPlayed = matches
            .filter(match => match.users.some(u => u.token === this.user!.token))
            .sort((a, b) => this.sortByDateChronologically(a.createdOn, b.createdOn));

          matchesPlayed.forEach(match => {
            const date = new Date(match.createdOn).toISOString().split('T')[0];
            const userIndex = match.users.findIndex(u => u.token === this.user!.token);

            this.matchesPerDay[date] = (this.matchesPerDay[date] || 0) + 1;

            this.matchesPerDayWon[date] = this.matchesPerDayWon[date] || 0;

            if (userIndex === 0) {
              this.matchesPerDayWon[date]++;
            }
          });

          const allDates = Array.from(new Set([
            ...Object.keys(this.matchesPerDay),
            ...Object.keys(this.matchesPerDayWon)
          ])).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

          this.data = {
            labels: allDates,
            datasets: [
              {
                label: 'Matches Played',
                data: allDates.map(date => this.matchesPerDay[date] || 0)
              },
              {
                label: 'Matches Won',
                data: allDates.map(date => this.matchesPerDayWon[date] || 0)
              }
            ]
          };
        }
      });
    }).catch(() => this.router.navigate(['/users']));
  }

  sortByDateChronologically(a: string, b: string) {
    return new Date(a).getTime() - new Date(b).getTime();
  }

}

