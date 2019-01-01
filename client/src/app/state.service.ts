import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  typeOfGame: any;
  playerName: any;
  playerNames: any;
  gameName: any;
  currentPlayersTurn: string;
  socket: any;
  gameInProgress: boolean;
  firstRoll: boolean;

  constructor() { }
}
