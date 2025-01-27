import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {Score} from './score.model';
import {ConfigService} from './shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class RankListService {
  url ='/api/ranklist'
  configService = inject(ConfigService)
  constructor(private httpClient: HttpClient) { }

  getTopScoresByGame(gameToken: string, scoreCount: number): Observable<Score[]> {
    console.log('Getting TopScoresByGame');
    return this.httpClient.get<Score[]>(this.configService.getBackendUrlWithContext(`${this.url}/${gameToken}?top=${scoreCount}`));
  }
}
