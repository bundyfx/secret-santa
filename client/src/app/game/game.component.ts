import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { RollResponse, RollRequest } from '../types/Roll';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['../landing/landing.component.css']
})
export class GameComponent implements OnInit {

  playerNames = this.stateService.playerNames;
  rollResponse: RollResponse;

  constructor(public stateService: StateService, public requestService: RequestService) { }

  public btnClickToRoll() {
    const rollRequest = new RollRequest(this.stateService.gameName);
    this.requestService.postRollRequest(`http://localhost:3000/roll`, rollRequest)
    .subscribe(resp => {
      this.rollResponse = { ... resp.body };
    });
    return false;
  }

  ngOnInit() {
  }

}
