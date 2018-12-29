import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import * as $ from 'jQuery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})


export class LandingComponent implements OnInit {

  constructor(public stateService: StateService,  private router: Router) {

  }

  public btnClick(value: string) {
    this.stateService.typeOfGame = value;
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
    // this.stateService.typeOfGame = '';

  }
}


