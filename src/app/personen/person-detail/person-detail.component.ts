import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {PersonService} from '../person.service';
import {Person} from '../person';

@Component({
    selector: 'app-person-detail',
    templateUrl: './person-detail.component.html',
    styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit, OnDestroy {
    selectedPerson: Person;
    private subscription: Subscription;


    constructor(private activatedRoute: ActivatedRoute,
        private personenService: PersonService,
        private router: Router) {}

    ngOnInit() {
        this.subscription = this.activatedRoute.params
            .map(params => params['id'])
            .switchMap(id => this.personenService.getPerson(id))
            .subscribe(person => this.selectedPerson = person);
    }

    onEdit() {
        this.router.navigate(['/personen', this.selectedPerson._id, 'edit']);
    }

    onDelete() {
        this.router.navigate(['/personen'])
        this.personenService.deletePerson(this.selectedPerson).subscribe(
            data => console.log(data),
            error => console.error(error)
        );

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}
