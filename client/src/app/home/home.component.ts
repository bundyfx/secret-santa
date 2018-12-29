import { Component, OnInit } from '@angular/core';
import * as $ from 'jQuery';
import { StateService } from '../state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(public stateService: StateService) {

  }

    // Init the socket connection on game create / join
    init(gameDetails: any) {
      const jsonDetails = gameDetails;

      // set-up a connection between the client and the server
      // @ts-ignore
      const socket = io.connect('http://localhost:3000');

      socket.on('connect', () => {
          console.log(`signed up to get messages from ${jsonDetails.gameName}`);
          // Connected, let's sign-up for to receive messages for this room
          socket.emit('room', { gameName: jsonDetails.gameName, playerName: jsonDetails.playerName});

          socket.on('disconnect', () => {
              console.log('client disconnected');
          });
      });

      socket.on('roll', (data) => {
          $('#roll-outcome').text(data);
      });
      socket.on('player-join', (data) => {
          console.log(`${data} joined!`);
          $('#player-list ul').append($(`<li id=${data}>`).text(data));
      });
      socket.on('player-leave', (data) => {
          $(`#${data}`).remove();
      });

    }
// your headphones are dead

  ngOnInit() {
    if (this.stateService.typeOfGame == null) {
      this.stateService.typeOfGame = 'Create Game';
    }

  }

}
