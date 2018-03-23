import {Subscription} from 'rxjs/Rx';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, Input} from '@angular/core';
import {PlanService} from '../plan.service';
import {Plan} from './../plan';
import {Person} from './../../personen/person';


@Component({
    selector: 'app-plan-item',
    templateUrl: './plan-item.component.html',
    styleUrls: ['./plan-item.component.css'],

})
export class PlanItemComponent {

    @Input() plan: Plan;
    @Input() planId: string;
    @Input() plaene: Plan[];
    private days: number;
    private dayRange: Date[];
    private planDate: Date;
    butDisabled: boolean = false;



    constructor(private activatedRoute: ActivatedRoute,
        private planService: PlanService,
        private router: Router) {}


// Initialisieren
    ngOnInit() {
        this.planDate = new Date(this.plan.year, this.plan.month - 1, 1);
        this.days = (new Date(this.plan.year, this.plan.month, 0)).getDate();
        this.dayRange = this.createRange(this.days);
    }

//Errechnen der Aktuelen  Stundenzahl  und prüfen ob ein Mitarbeiter an geprüftem Tag arbeitet
    checkPerson(tag, person) {
        var plaeneThisMonth = this.plaene
            .filter(
            (item: any) =>
                item.month == this.plan.month &&
                item.year == this.plan.year &&
                item._id != this.plan._id);

        var arbeitszeiten = []
        plaeneThisMonth
            .forEach(
            (item: any) =>
                item.arbeitszeiten
                    .filter(
                    (item: any) =>
                        item.person._id == person)
                    .forEach(
                    (item: any) =>
                        arbeitszeiten.push(item))
            );

        var overallWorktime = 0;
        var alreadyAtWork = false;
        arbeitszeiten
            .forEach(
            (item: any) =>
                item.arbeitstage
                    .forEach(
                    (item: any) => {
                        if ((new Date(tag.tag)).getDate() === (new Date(item.tag)).getDate() && item.schicht) {
                            alreadyAtWork = this.schichtOverlap(tag.schicht, item.schicht);
                        }
                        if (item.schicht) {
                            overallWorktime += this.getTimeFromSchicht(item.schicht);
                        }
                    })
            );
        this.plan.arbeitszeiten
            .filter(
            (item: any) =>
                person == item.person._id)
            .forEach(
            (item: any) =>
                item.arbeitstage
                    .forEach(
                    (item: any) => {
                        if (item.schicht) {
                            overallWorktime += this.getTimeFromSchicht(item.schicht);
                        }
                    }));

        return {worktime: overallWorktime, overlap: alreadyAtWork};
    }


//Dauer einer Schicht ausrechnen
    getTimeFromSchicht(schicht) {
        var startHrs = parseInt(schicht.startHrs);
        var startMins = parseInt(schicht.startMins);
        var endHrs = parseInt(schicht.endHrs);
        var endMins = parseInt(schicht.endMins);
        var workingTime = 0;

        if (startHrs > endHrs) {    //next day
            workingTime = ((24 - startHrs) + endHrs) * 60;
        } else {
            workingTime = (endHrs - startHrs) * 60;
        }
        return workingTime;

    }


// Zeitüberschreitung Prüfen
    schichtOverlap(first, second) {
        var startHrs1 = parseInt(first.startHrs);
        var startMins1 = parseInt(first.startMins);
        var endHrs1 = parseInt(first.endHrs);
        var endMins1 = parseInt(first.endMins);
        var startHrs2 = parseInt(second.startHrs);
        var startMins2 = parseInt(second.startMins);
        var endHrs2 = parseInt(second.endHrs);
        var endMins2 = parseInt(second.endMins);
        if ((startHrs1 <= endHrs2) && (endHrs1 >= startHrs2)) {
            return true;
        }
        return false;
    }


    // Tage in Monat
    createRange(number) {
        var items: Date[] = [];
        for (var i = 1; i <= number; i++) {
            items.push(new Date(this.plan.year, this.plan.month - 1, i));
        }
        return items;
    }
 //Geschäftsregeln Prüfen
    onChange(event, i, j) {
        delete this.plan.arbeitszeiten[i].arbeitstage[j]['_valid_schicht'];
        delete this.plan.arbeitszeiten[i].arbeitstage[j]['_valid_time'];
        if (event == '') {
            this.plan.arbeitszeiten[i].arbeitstage[j].schicht = null;
            return;
        }
        var tag = this.plan.arbeitszeiten[i].arbeitstage[j];
        var person = this.plan.arbeitszeiten[i].person;
        var check = this.checkPerson(tag, person._id);
        //Prüfen ob maximale Arbeitszeit errecht ist
        if (check.worktime > (person.hours * 60)) {
            this.plan.arbeitszeiten[i].arbeitstage[j]['_valid_time'] = true;
            this.plan.arbeitszeiten[i].arbeitstage[j].schicht = null;
        } else if (check.overlap) {
            this.plan.arbeitszeiten[i].arbeitstage[j]['_valid_schicht'] = true;
            this.plan.arbeitszeiten[i].arbeitstage[j].schicht = null;
        }
    }

    save() {
        if (this.butDisabled) {
            this.planService
                .editPlan(this.plan)
                .subscribe(
                data => console.log(data),
                error => console.error(error)
                );
        }
    }

    onEdit() {
        this.router.navigate(['/plaene', this.plan._id, 'edit']);
    }


    onDelete() {
        this.planService.deletePlan(this.plan).subscribe(
            data => console.log(data),
            error => console.error(error)
        );
        this.router.navigate(['/plaene']);
    }

    onCancel() {
        this.router.navigate(['/plaene']);
    }

    //    ngOnDestroy() {
    //        this.subscription.unsubscribe();
    //    }




}
