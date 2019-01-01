import { Component, OnInit } from '@angular/core';
import * as $ from 'jQuery';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import { GameInfo } from '../types/GameInfo';
import { RequestService } from '../request.service';
import { PostResponse } from '../types/PostResponse';
import { RollResponse } from '../types/Roll';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  postResponse: PostResponse | RollResponse;

  constructor(public stateService: StateService, private router: Router, public requestService: RequestService) {

  }

    // Init the socket connection on game create / join
    init(gameDetails: GameInfo) {
      const jsonDetails = gameDetails;
      console.log(jsonDetails);
      // set-up a connection between the client and the server
      // @ts-ignore
      const socket = io.connect('http://localhost:3000');

      socket.on('connect', () => {
          this.stateService.socket = socket;
          console.log(`signed up to get messages from ${jsonDetails.gameName}`);
          // Connected, let's sign-up for to receive messages for this room
          socket.emit('room', { gameName: jsonDetails.gameName, playerName: jsonDetails.playerName});

          socket.on('disconnect', () => {
              console.log('client disconnected');
          });
      });

      socket.on('start-game', (gameInfo: GameInfo) => {
        $('#start').hide();
        $('.player-turn').text(`${gameInfo.playerName} started the game!`);
        this.stateService.playerNames = gameInfo.playerList;
      });
      socket.on('players-turn', (data) => {
        console.log(data);
        $('.player-turn').text(`${data}'s turn`);
      });
      socket.on('roll', (data) => {
          $('#roll-outcome').text(data);
      });
      socket.on('player-join', (data) => {
          console.log(`${data} joined!`);
          $('#player-list ul').append($(`<li id=${data}>`).text(data));
          setTimeout(() => {
            $(`#${data}`).toggleClass('show');
          }, 10);
      });
      socket.on('player-leave', (data) => {
          $(`#${data.playerName}`).remove();
          const gameInfo = new GameInfo(data.playerName, data.gameName);

          this.requestService.postGameRequest(`http://localhost:3000/game?leave=true`, gameInfo)
          .subscribe(resp => {
            this.postResponse = { ... resp.body } as PostResponse | RollResponse;
            this.stateService.playerNames = this.stateService.playerNames.filter(player => player !== data.playerName);
          });
          return false;
      });
    }

    public btnClickToGame() {
      const stateSplitLower = this.stateService.typeOfGame.split(' ')[0].toLowerCase();
      const url = `http://localhost:3000/game?${stateSplitLower}=true`;

      this.stateService.playerName = $('#name').val();
      this.stateService.gameName = $('#comment').val();
      const gameInfo = new GameInfo(this.stateService.playerName, this.stateService.gameName);
      this.init(gameInfo);
      this.requestService.postGameRequest(url, gameInfo)
        .subscribe(resp => {
          this.postResponse = { ... resp.body };
          this.stateService.playerNames = this.postResponse.playerList;
          this.router.navigateByUrl('/game');
        });
        return false;
    }

  ngOnInit() {
    if (this.stateService.typeOfGame == null) {
      this.stateService.typeOfGame = 'Create Game';
    }

  }

}
