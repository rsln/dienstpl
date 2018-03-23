import {KundeService} from '../kunde.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Kunde} from '../kunde';
import {Subscription} from 'rxjs/Rx';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-kunde-edit',
    templateUrl: './kunde-edit.component.html',
    styleUrls: ['./kunde-edit.component.css']
})
export class KundeEditComponent implements OnInit {

    kundeForm: FormGroup;
    private kunde: Kunde;
    private isNew = true;
    private subscription: Subscription;
    private emailPattern: string = "( ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)";
    private plzRegex: string = "( 'hiwefwe883290awefoijwfe8382jfwef'.match(regex))";

    constructor(private kundeService: KundeService, private router: Router,
        private route: ActivatedRoute) {}

//Daten an Service übergeben
    onSubmit() {
        const newKunde = this.kundeForm.value;
        if (this.isNew) {
            this.kundeService.addKunde(newKunde).subscribe(
                data => console.log(data),
                error => console.error(error)
            );
        } else {
            newKunde["_id"] = this.kunde._id;
            this.kundeService.editKunde(newKunde).subscribe(
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
        this.router.navigate(['/kunden']);
    }


    //Neue FormGroup erstellen und die Felder validieren
    ngOnInit() {

        this.kundeForm = new FormGroup({
            'firma': new FormControl(null, Validators.required),
            'ansprechspartner': new FormControl(null, Validators.required),
            'tel': new FormControl(null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(15)])),
            'email': new FormControl(null, Validators.required),
            'adress': new FormControl(null, Validators.required),
            'plz': new FormControl(null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])),
            'city': new FormControl(null, Validators.required)
        });

        this.subscription = this.route.params.subscribe(
            params => {
                if (params.hasOwnProperty('id')) {
                    this.isNew = false;
                    this.kundeService.getKunde(params['id']).subscribe(
                        kunde => {
                            this.kunde = kunde;
                            this.kundeForm.patchValue(kunde);
                        });

                } else {
                    this.isNew = true;
                    this.kunde = null;
                }
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
