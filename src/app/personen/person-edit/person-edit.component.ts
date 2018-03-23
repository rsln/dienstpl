import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {PersonService} from '../person.service';
import {Person} from '../person';



@Component({
    selector: 'app-person-edit',
    templateUrl: './person-edit.component.html',
    styleUrls: ['./person-edit.component.css']
})

export class PersonEditComponent implements OnInit {
    personForm: FormGroup;
    private person: Person;
    private isNew = true;
    private subscription: Subscription;
    private base64Encoded: string;
    private emailPattern: string = "( ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)";
    private numberRegex: string = "( 'hiwefwe883290awefoijwfe8382jfwef'.match(regex))";

    constructor(private personService: PersonService, private router: Router,
        private route: ActivatedRoute) {

    }

    //Daten an Service übergeben
    onSubmit() {
        const newPerson = this.personForm.value;
        if(this.base64Encoded){
            newPerson.imagePath = this.base64Encoded;
        }
        if (this.isNew) {
            this.personService.addPerson(newPerson).subscribe(
                data => console.log(data),
                error => console.error(error)
            );
        } else {
            newPerson["_id"] = this.person._id;
            this.personService.editPerson(newPerson).subscribe(
                data => console.log(data),
                error => console.error(error)
            );
        }

        this.onNavigateBack();
    }

    // Bilder in String konvertieren 
    getFileAsBase64(event) {
        var self = this;
        var file: File = event.target.files[0];
        var fileReader: FileReader = new FileReader();
        fileReader.onloadend = function (e) {
            self.base64Encoded = fileReader.result;
        }
        fileReader.readAsDataURL(file);
    }

    onCancel() {
        this.onNavigateBack();
    }

    onNavigateBack() {
        this.router.navigate(['/personen']);
    }

    ngOnInit() {

        this.personForm = new FormGroup({
            'name': new FormControl(null, Validators.required),
            'tel': new FormControl(null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(15)])),
            'email': new FormControl(null, Validators.required),
            'adress': new FormControl(null, Validators.required),
            'plz': new FormControl(null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])),
            'city': new FormControl(null, Validators.required),
            'hours': new FormControl(null, Validators.required),
            'imagePath': new FormControl(null),
        });

        this.subscription = this.route.params.subscribe(
            params => {
                if (params.hasOwnProperty('id')) {
                    this.isNew = false;
                    this.personService.getPerson(params['id']).subscribe(
                        person => {
                            this.person = person;
                            this.personForm.patchValue(person);
                            if(person.imagePath){
                                this.base64Encoded = person.imagePath;
                            }
                        });

                } else {
                    this.isNew = true;
                    this.person = null;
                }
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
