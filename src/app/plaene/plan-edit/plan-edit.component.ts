import {FormGroup, FormControl, Validators} from '@angular/forms';
import {FormArray} from '@angular/forms/src/model';
import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {ActivatedRoute, Router} from '@angular/router';
import {KundeService} from './../../kunden/kunde.service';
import {Kunde} from '../../kunden/kunde';
import {PersonService} from './../../personen/person.service';
import {Person} from '../../personen/person';
import {PlanService} from './../plan.service';
import {Plan} from './../plan';
import {Arbeitszeiten} from './../arbeitszeiten';
import {Arbeitstag} from './../arbeitstag';
import {Schicht} from './../schicht';


@Component({
    selector: 'app-plan-edit',
    templateUrl: './plan-edit.component.html',
    styleUrls: ['./plan-edit.component.css'],


})

export class PlanEditComponent implements OnInit {

    planForm: FormGroup;

    private kunden: Kunde[] = [];
    private personenAll: Person[] = [];
    private availablePersonen: Person[] = [];
    private plan: Plan;
    private isNew = true;
    private subscription: Subscription;
    private mm: number;

    private years: number[] = [];
    private yy: number;

    private hoursRegex: string = "([01]?[0-9]|2[0-3])";
    private minuteRegex: string = "[0-5][0-9]";

    months = [
        {val: 1, name: 'Jan'},
        {val: 2, name: 'Feb'},
        {val: 3, name: 'Mar'},
        {val: 4, name: 'Apr'},
        {val: 5, name: 'May'},
        {val: 6, name: 'Jun'},
        {val: 7, name: 'Jul'},
        {val: 8, name: 'Aug'},
        {val: 9, name: 'Sep'},
        {val: 10, name: 'Oct'},
        {val: 11, name: 'Nov'},
        {val: 12, name: 'Dec'}
    ];


    constructor(private planService: PlanService, private router: Router,
        private route: ActivatedRoute, private kundeService: KundeService, private personService: PersonService) {
    }

    onSubmit() {
        var arbeitszeiten = new Array<Arbeitszeiten>();
        var arbeitstage = new Array<Arbeitstag>();

        var number = (new Date(this.planForm.value.year, this.planForm.value.month, 0)).getDate();
        for (var i = 1; i <= number; i++) {
            arbeitstage.push(new Arbeitstag(new Date(this.planForm.value.year, this.planForm.value.month - 1, i), null));
        }
        if (this.isNew) {
            for (let person of this.planForm.value.personen) {
                arbeitszeiten.push(
                    new Arbeitszeiten(
                        arbeitstage,
                        this.personenAll.find((item: any) => item._id === person.id)
                    ));
            }
            this.planService.addPlan(
                new Plan(
                    this.planForm.value.month,
                    this.planForm.value.year,
                    this.kunden.find((item: any) => item._id === this.planForm.value.firma),
                    arbeitszeiten,
                    this.planForm.value.schichten))
                .subscribe(
                data => console.log(data),
                error => console.error(error)
                );
        } else {
            for (let person of this.planForm.value.personen) {
                var oldArbeitszeiten = this.plan.arbeitszeiten.find((item: any) => item.person._id === person.id);
                if (oldArbeitszeiten) {
                    if (this.planForm.value.month == this.plan.month && this.planForm.value.year == this.plan.year) {
                        arbeitszeiten.push(oldArbeitszeiten);
                    } else {
                        arbeitszeiten.push(
                            new Arbeitszeiten(
                                arbeitstage,
                                this.personenAll.find((item: any) => item._id === person.id)
                            ));
                    }
                } else {
                    arbeitszeiten.push(
                        new Arbeitszeiten(
                            arbeitstage,
                            this.personenAll.find((item: any) => item._id === person.id)
                        ));
                }
            }
            this.planService.editPlan(
                new Plan(
                    this.planForm.value.month,
                    this.planForm.value.year,
                    this.kunden.find((item: any) => item._id === this.planForm.value.firma),
                    arbeitszeiten,
                    this.planForm.value.schichten,
                    this.plan._id))
                .subscribe(
                data => console.log(data),
                error => console.error(error)
                );
        }

        this.onNavigateBack();
    }

    onCancel() {
        this.onNavigateBack();
    }

    onNavigateBack() {
        this.router.navigate(['/plaene']);
    }

    getMonth() {
        var today = new Date();

        this.mm = today.getMonth() + 1;



    }

    getYear() {
        var today = new Date();
        this.yy = today.getFullYear();
        for (var i = this.yy; i <= this.yy + 25; i++) {
            this.years.push(i);
        }
    }


    // Ausgewaelte Mitarbeiter neben der Auswahlliste anzeigen 
    onAddPersonControl(name: string) {
        (<FormArray> this.planForm.get('personen')).push(
            new FormGroup({
                'name': new FormControl(this.personenAll.find((item: any) => item._id === name).name, Validators.required),
                'id': new FormControl(name, Validators.required)
            })
        );
        var index = this.availablePersonen.findIndex((item: any) => item._id === name);
        this.availablePersonen.splice(index, 1);

    }

    //Ausgewälte Mitarbeiter entfernen
    onRemovePersonControl(index: number) {
        var idRemove = this.planForm.value.personen[index].id;
        var person = this.personenAll.find((item: any) => item._id === idRemove);
        this.availablePersonen.push(person);
        (<FormArray> this.planForm.get('personen')).removeAt(index);
    }

    onAddSchichtControl(name: string, startHrs: number, startMins: number, endHrs: number, endMins: number) {
        (<FormArray> this.planForm.get('schichten')).push(
            new FormGroup({
                'name': new FormControl(name, Validators.required),
                'startHrs': new FormControl(startHrs, [Validators.required, Validators.pattern(this.hoursRegex)]),
                'startMins': new FormControl(startMins, [Validators.required, Validators.pattern(this.minuteRegex)]),
                'endHrs': new FormControl(endHrs, [Validators.required, Validators.pattern(this.hoursRegex)]),
                'endMins': new FormControl(endMins, [Validators.required, Validators.pattern(this.minuteRegex)])
            })
        );
    }

    onRemoveSchichtControl(index: number) {
        (<FormArray> this.planForm.get('schichten')).removeAt(index);
    }


//Initialisieren
    ngOnInit() {

        this.planForm = new FormGroup({
            'firma': new FormControl(null, Validators.required),
            'month': new FormControl(null, Validators.required),
            'year': new FormControl(null, Validators.required),
            'schichten': new FormArray([], Validators.required),
            'personen': new FormArray([], Validators.required)
        });

        this.getMonth();
        this.getYear();

        this.kundeService.getKunden()
            .subscribe(
            (kunden: Kunde[]) => {
                this.kunden = kunden;
            }
            );

        this.personService.getPersonen()
            .subscribe(
            (personen: Person[]) => {
                this.personenAll = personen;
                this.availablePersonen = personen.slice();
            }
            );

        this.subscription = this.route.params.subscribe(
            params => {
                if (params.hasOwnProperty('id')) {
                    this.isNew = false;
                    this.planService.getPlan(params['id']).subscribe(
                        (plan: Plan) => {
                            this.plan = plan;
                            this.planForm.patchValue({'firma': plan.kunde._id});
                            this.planForm.get('firma').disable();
                            this.planForm.patchValue({'month': plan.month});
                            this.planForm.patchValue({'year': plan.year});
                            for (let arbeitszeit of plan.arbeitszeiten) {
                                (<FormArray> this.planForm.get('personen')).push(
                                    new FormGroup({
                                        'name': new FormControl(arbeitszeit.person.name, Validators.required),
                                        'id': new FormControl(arbeitszeit.person._id, Validators.required)
                                    })
                                )
                                var index = this.availablePersonen.findIndex((item: any) => item._id === arbeitszeit.person._id);
                                this.availablePersonen.splice(index, 1);
                            }
                            for (let schicht of plan.schichten) {
                                (<FormArray> this.planForm.get('schichten')).push(
                                    new FormGroup({
                                        'name': new FormControl(schicht.name, Validators.required),
                                        'startHrs': new FormControl(schicht.startHrs, [Validators.required, Validators.pattern(this.hoursRegex)]),
                                        'startMins': new FormControl(schicht.startMins, [Validators.required, Validators.pattern(this.minuteRegex)]),
                                        'endHrs': new FormControl(schicht.endHrs, [Validators.required, Validators.pattern(this.hoursRegex)]),
                                        'endMins': new FormControl(schicht.endMins, [Validators.required, Validators.pattern(this.minuteRegex)]),
                                        '_id': new FormControl(schicht._id)
                                    })
                                )
                            }
                        });
                } else {
                    this.isNew = true;
                    this.plan = null;
                }
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
