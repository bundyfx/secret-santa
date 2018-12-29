import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  typeOfGame: string;
  playerName: string;
  playerNames: any;
  gameName: string;

  constructor() { }
}
