import {Component, OnInit, } from '@angular/core';
import {Router} from '@angular/router';
import {PersonService} from '../person.service';
import {Person} from '../person';

@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

    personen: Person[];

    constructor(private personService: PersonService, private router: Router) {}

    onNewPerson() {
        this.router.navigate(['/personen', 'new']);
    }

    ngOnInit() {
        this.personService.getPersonen().subscribe(
            (personen: Person[]) => {
                this.personen = personen;
            }
        );

    }


}
