import {KundeService} from '../kunde.service';
import {Router} from '@angular/router';
import {Kunde} from '../kunde';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-kunde-list',
    templateUrl: './kunde-list.component.html',
    styleUrls: ['./kunde-list.component.css']
})
export class KundeListComponent implements OnInit {

    kunden: Kunde[];

    constructor(private kundeService: KundeService, private router: Router) {}

    onNewKunde() {
        this.router.navigate(['/kunden', 'new']);
    }

    ngOnInit() {

        this.kundeService.getKunden()
            .subscribe(
            (kunden: Kunde[]) => {
                this.kunden = kunden;
            }
            );
    }

}
