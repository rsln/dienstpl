import { Component, OnInit } from '@angular/core';
import { Kunde } from './kunde';

@Component({
  selector: 'app-kunden',
  templateUrl: './kunden.component.html',
  styleUrls: ['./kunden.component.css']
})
export class KundenComponent implements OnInit {
  selectedKunde: Kunde;
  constructor() { }

  ngOnInit() {
  }

}
