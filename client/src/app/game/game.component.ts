import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['../landing/landing.component.css']
})
export class GameComponent implements OnInit {

  playerNames = this.stateService.playerNames;

  constructor(public stateService: StateService) { }

  ngOnInit() {
  }

}
