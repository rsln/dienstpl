import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kunde-start',
  template: `
    <div class="jumbotron">
      <div class="container">
        <h2> Bitte wählen Sie einem Kunden aus um weitere Informationen zu erhalten</h2>
      </div>
    </div>
  `,
  styles: ['h2 { text-align: center; }']

})
export class KundeStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
