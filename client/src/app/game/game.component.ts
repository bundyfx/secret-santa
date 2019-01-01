import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import * as $ from 'jQuery';
import { RollResponse, RollRequest } from '../types/Roll';
import { RequestService } from '../request.service';
import { GameInfo } from '../types/GameInfo';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['../landing/landing.component.css']
})
export class GameComponent implements OnInit {

  playerNames = this.stateService.playerNames;
  gameName = this.stateService.gameName;
  playerTurn: string;
  rollResponse: RollResponse;

  constructor(public stateService: StateService, public requestService: RequestService, private router: Router) { }

  public btnClickToRoll() {
    const rollRequest = new RollRequest(
      this.stateService.gameName,
      this.stateService.playerName,
      this.stateService.playerNames,
      this.stateService.firstRoll
    );
    this.requestService.postRollRequest(`http://localhost:3000/roll`, rollRequest)
    .subscribe(resp => {
      this.rollResponse = { ... resp.body };
      this.stateService.firstRoll = false;
    });
    return false;
  }

  public btnClickToStart() {
    const gameInfo = new GameInfo(this.stateService.playerName, this.stateService.gameName);
    this.stateService.firstRoll = true;
    this.stateService.socket.emit('start-game', gameInfo);
    return false;
  }

  // private getNextItem(array: string[], currentValue: string): string {
  //   console.log(`Current value is ${currentValue}`);
  //   const index = array.indexOf(currentValue);
  //   if (index >= 0 && index < array.length - 1) {
  //     const nextItem = array[index + 1];
  //     return nextItem;
  //   }
  //   return array[0];
  // }

  // public getNextPlayerName(playerNames: string[]): string {
  //   const nextPlayer = this.getNextItem(playerNames, this.playerTurn);
  //   $('.player-turn').text(`${nextPlayer}'s turn`);
  //   return nextPlayer;
  // }

  ngOnInit() {
    if (this.stateService.gameName == null) {
      this.router.navigateByUrl('');
    }
    // Init to set the first player to a random player from the game
    this.playerTurn = this.stateService.playerNames[Math.floor(Math.random() * this.stateService.playerNames.length)];
    this.stateService.firstRoll = false;
  }

}
