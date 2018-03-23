import { Component, OnInit } from '@angular/core';
import { Person } from './person';

@Component({
  selector: 'app-personen',
  templateUrl: './personen.component.html',
  styleUrls: ['./personen.component.css']
})
export class PersonenComponent implements OnInit {
  selectedPerson: Person;


  constructor() { }

  ngOnInit() {
  }

}
