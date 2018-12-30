import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';
import { PostResponse } from './types/PostResponse';
import { GameInfo } from './types/GameInfo';
import { RollRequest, RollResponse } from './types/Roll';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient, public stateService: StateService) { }

  public postGameRequest(url: string, gameInfo: GameInfo) {
    return this.http.post<PostResponse>(url, gameInfo, { observe: 'response' });
  }
  public postRollRequest(url: string, gameInfo: RollRequest) {
    return this.http.post<RollResponse>(url, gameInfo, { observe: 'response' });
  }
}
