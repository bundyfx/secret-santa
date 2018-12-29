import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // New and Join buttons,
  // When new is clicked render the "new game" form and when join "render the join form"
  typeOfGame: string;

  constructor() { }
}
