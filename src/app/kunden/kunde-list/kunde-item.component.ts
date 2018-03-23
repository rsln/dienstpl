import { ActivatedRoute, Router } from '@angular/router';
import { KundeService } from '../kunde.service';
import { Subscription } from 'rxjs/Rx';
import { Kunde } from '../kunde';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kunde-item',
  templateUrl: './kunde-item.component.html',
  styleUrls: ['./kunde-item.component.css']
})
export class KundeItemComponent  {

  @Input() kunde: Kunde;
  @Input() kundeId: string;



}


