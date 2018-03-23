import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-start',
    template: `
    <div class="jumbotron">
    <div class="container">
    <h2> Bitte wählen Sie eine Person aus um weitere Informationen zu erhalten</h2>
    </div>
    </div>
  `,
  styles: ['h2 { text-align: center; }']
})
export class PersonStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
