import { Component, Input } from '@angular/core';
import { Person } from '../person';

@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.css']
})
export class PersonItemComponent {

  //property Binding
  @Input() person: Person;
  @Input() personId: string;
 
 
}
