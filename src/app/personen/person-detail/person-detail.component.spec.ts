import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { PersonService } from "../person.service";
import { PersonDetailComponent } from "./person-detail.component";

describe("PersonDetailComponent", () => {
	let comp: PersonDetailComponent;
	let fixture: ComponentFixture<PersonDetailComponent>;
	let activatedRouteStub: any;
	let routerStub: any;
	let personServiceStub: any;

	beforeEach(() => {
		activatedRouteStub = {
			params: {
				map: () => ({
					switchMap: () => ({
						subscribe: () => ({})
					})
				})
			}
		};
		routerStub = {
			navigate: () => ({})
		};
		personServiceStub = {
			getPerson: () => ({}),
			deletePerson: () => ({
				subscribe: () => ({})
			})
		};
		TestBed.configureTestingModule({
			declarations: [ PersonDetailComponent ],
			schemas: [ NO_ERRORS_SCHEMA ],
			providers: [
				{ provide: ActivatedRoute, useValue: activatedRouteStub },
				{ provide: Router, useValue: routerStub },
				{ provide: PersonService, useValue: personServiceStub }
			]
		});
		fixture = TestBed.createComponent(PersonDetailComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

	describe("ngOnInit", () => {
		it("makes expected calls", () => {
			spyOn(personServiceStub, "getPerson");
			comp.ngOnInit();
			expect(personServiceStub.getPerson).toHaveBeenCalled();
		});
	});

	describe("onEdit", () => {
		it("makes expected calls", () => {
			spyOn(routerStub, "navigate");
			comp.onEdit();
			expect(routerStub.navigate).toHaveBeenCalled();
		});
	});

	describe("onDelete", () => {
		it("makes expected calls", () => {
			spyOn(routerStub, "navigate");
			spyOn(personServiceStub, "deletePerson");
			comp.onDelete();
			expect(routerStub.navigate).toHaveBeenCalled();
			expect(personServiceStub.deletePerson).toHaveBeenCalled();
		});
	});

});
