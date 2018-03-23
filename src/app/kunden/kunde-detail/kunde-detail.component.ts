import {KundeService} from '../kunde.service';
import {Kunde} from '../kunde';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';

@Component({
    selector: 'app-person-detail',
    templateUrl: './kunde-detail.component.html',
    styleUrls: ['./kunde-detail.component.css']
})
export class KundeDetailComponent implements OnInit, OnDestroy {
    selectedKunde: Kunde;
    private subscription: Subscription;


    constructor(private activatedRoute: ActivatedRoute,
        private kundenService: KundeService,
        private router: Router) {}

    ngOnInit() {
        this.subscription = this.activatedRoute.params
            .map(params => params['id'])
            .switchMap(id => this.kundenService.getKunde(id))
            .subscribe(kunde => this.selectedKunde = kunde);

    }

    onEdit() {
        this.router.navigate(['/kunden', this.selectedKunde._id, 'edit']);
    }

    onDelete() {
        this.router.navigate(['/kunden'])
        this.kundenService.deleteKunde(this.selectedKunde).subscribe(
            data => console.log(data),
            error => console.error(error)
        );

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}
