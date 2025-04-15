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
      this.loadAndProcessMatches();
    }).catch(() => this.router.navigate(['/users']));
  }

  loadAndProcessMatches() {
    this.matchService.getAllMatches().subscribe({
      next: matches => {
        const matchesPlayed = this.getMatchesPlayedByUser(this.user!, matches)
        const { matchesPerDayByGame, matchesWonPerDayByGame } = this.buildGameStats(matchesPlayed);

        const matchesTotalPerDay = this.calculateTotalsByDate(matchesPerDayByGame)
        const matchesTotalPerDayWon = this.calculateTotalsByDate(matchesWonPerDayByGame);


        const allDates = this.getAllUniqueDates([matchesPerDayByGame, matchesWonPerDayByGame]);

        const dataSets = this.buildChartDatasets(
          matchesPerDayByGame,
          matchesWonPerDayByGame,
          matchesTotalPerDay,
          matchesTotalPerDayWon,
          allDates
        )

        this.data = {
          labels: allDates,
          datasets: dataSets,
        };
      },
      error: () => {
        this.router.navigate(['/users']);
      }
    });
  }

  sortByDateChronologically(a: string, b: string) {
    return new Date(a).getTime() - new Date(b).getTime();
  }

  getMatchesPlayedByUser(user: User, matches: Match[]): Match[] {
    return matches
      .filter(match => match.users.some(u => u.token === user.token))
      .sort((a, b) => this.sortByDateChronologically(a.createdOn, b.createdOn));
  }

  buildGameStats(matchesPlayed: Match[]) {
    const matchesPerDayByGame: Record<string, Record<string, number>> = {};
    const matchesWonPerDayByGame: Record<string, Record<string, number>> = {};

    for (const match of matchesPlayed) {
      const date = new Date(match.createdOn).toISOString().split('T')[0];
      const game = match.game?.name || 'Unknown Game';
      const userIndex = match.users.findIndex(u => u.token === this.user!.token);

      matchesPerDayByGame[game] = matchesPerDayByGame[game] || {};
      matchesPerDayByGame[game][date] = (matchesPerDayByGame[game][date] || 0) + 1;

      matchesWonPerDayByGame[game] = matchesWonPerDayByGame[game] || {};
      matchesWonPerDayByGame[game][date] = matchesWonPerDayByGame[game][date] || 0;

      if (userIndex === 0) {
        matchesWonPerDayByGame[game][date]++;
      }
    }

    return { matchesPerDayByGame, matchesWonPerDayByGame}
  }

  calculateTotalsByDate(byGame: Record<string, Record<string, number>>) {
    const totals: Record<string, number> = {};

    for (const gameStats of Object.values(byGame)) {
      for (const [date, count] of Object.entries(gameStats)) {
        totals[date] = (totals[date] || 0) + count;
      }
    }

    return totals;
  }

  getAllUniqueDates(sources: Record<string, Record<string, number>>[]): string[] {
    const allDates = new Set<string>();

    for (const stats of sources) {
      for (const date of Object.values(stats).flatMap(obj => Object.keys(obj))) {
        allDates.add(date)
      }
    }

    return Array.from(allDates).sort((a,b) => this.sortByDateChronologically(a, b));
  }

  private buildChartDatasets(matchesPerDayByGame: Record<string, Record<string, number>>,
                             matchesWonPerDayByGame: Record<string, Record<string, number>>,
                             matchesTotalPerDay: Record<string, number>,
                             matchesTotalPerDayWon: Record<string, number>,
                             allDates: string[]): any[] {

    const dataSets = [];

    for (const game of Object.keys(matchesPerDayByGame)) {
      dataSets.push({
        label: `${game} Matches Played`,
        data: allDates.map(date => matchesPerDayByGame[game][date] || 0),
        hidden: true,
      });

      dataSets.push({
        label: `${game} Matches Won`,
        data: allDates.map(date => matchesWonPerDayByGame[game]?.[date] || 0),
        hidden: true,
      });
    }

    dataSets.push({
      label: 'Total Matches Played',
      data: allDates.map(date => matchesTotalPerDay[date] || 0),
    })

    dataSets.push({
      label: 'Total Matches Won',
      data: allDates.map(date => matchesTotalPerDayWon[date] || 0),
    });

    return dataSets;
    }
}

