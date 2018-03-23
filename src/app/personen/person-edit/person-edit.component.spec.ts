import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { PersonService } from "../person.service";
import { PersonEditComponent } from "./person-edit.component";

describe("PersonEditComponent", () => {
	let comp: PersonEditComponent;
	let fixture: ComponentFixture<PersonEditComponent>;
	let activatedRouteStub: any;
	let routerStub: any;
	let personServiceStub: any;

	beforeEach(() => {
		activatedRouteStub = {
			params: {
				subscribe: () => ({})
			}
		};
		routerStub = {
			navigate: () => ({})
		};
		personServiceStub = {
			addPerson: () => ({
				subscribe: () => ({})
			}),
			editPerson: () => ({
				subscribe: () => ({})
			}),
			getPerson: () => ({
				subscribe: () => ({})
			})
		};
		TestBed.configureTestingModule({
			declarations: [ PersonEditComponent ],
			schemas: [ NO_ERRORS_SCHEMA ],
			providers: [
				{ provide: ActivatedRoute, useValue: activatedRouteStub },
				{ provide: Router, useValue: routerStub },
				{ provide: PersonService, useValue: personServiceStub }
			]
		});
		fixture = TestBed.createComponent(PersonEditComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

	describe("onSubmit", () => {
		it("makes expected calls", () => {
			spyOn(comp, "onNavigateBack");
			comp.onSubmit();
			expect(comp.onNavigateBack).toHaveBeenCalled();
		});
	});

	describe("onCancel", () => {
		it("makes expected calls", () => {
			spyOn(comp, "onNavigateBack");
			comp.onCancel();
			expect(comp.onNavigateBack).toHaveBeenCalled();
		});
	});

});
