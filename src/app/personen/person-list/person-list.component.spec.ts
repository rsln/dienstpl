import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from "@angular/router";
import { PersonService } from "../person.service";
import { PersonListComponent } from "./person-list.component";

describe("PersonListComponent", () => {
	let comp: PersonListComponent;
	let fixture: ComponentFixture<PersonListComponent>;
	let routerStub: any;
	let personServiceStub: any;

	beforeEach(() => {
		routerStub = {
			navigate: () => ({})
		};
		personServiceStub = {
			getPersonen: () => ({
				subscribe: () => ({})
			})
		};
		TestBed.configureTestingModule({
			declarations: [ PersonListComponent ],
			schemas: [ NO_ERRORS_SCHEMA ],
			providers: [
				{ provide: Router, useValue: routerStub },
				{ provide: PersonService, useValue: personServiceStub }
			]
		});
		fixture = TestBed.createComponent(PersonListComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

	describe("onNewPerson", () => {
		it("makes expected calls", () => {
			spyOn(routerStub, "navigate");
			comp.onNewPerson();
			expect(routerStub.navigate).toHaveBeenCalled();
		});
	});

	describe("ngOnInit", () => {
		it("makes expected calls", () => {
			spyOn(personServiceStub, "getPersonen");
			comp.ngOnInit();
			expect(personServiceStub.getPersonen).toHaveBeenCalled();
		});
	});

});
