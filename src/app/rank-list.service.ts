import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {Score} from './score.model';

@Injectable({
  providedIn: 'root'
})
export class RankListService {
  url ='/api/ranklist'
  constructor(private httpClient: HttpClient) { }

  getTopScoresByGame(gameToken: string, scoreCount: number): Observable<Score[]> {
    console.log('Getting TopScoresByGame');
    return this.httpClient.get<Score[]>(`${this.url}/${gameToken}?top=${scoreCount}`);
  }
}
