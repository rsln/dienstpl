import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {PlanService} from '../plan.service';
import {Plan} from '../plan';


@Component({
    selector: 'app-plan-list',
    templateUrl: './plan-list.component.html',
    styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {

    plaene: Plan[] = [];

    constructor(private planService: PlanService, private router: Router) {}

    ngOnInit() {
        this.planService.getPlaene().subscribe(
            (plaene: Plan[]) => {
                this.plaene = plaene;
            }
        );
    }

    //Zur Formular navigieren
    onNewPlan() {
        this.router.navigate(['/plaene', 'new']);
    }

}
