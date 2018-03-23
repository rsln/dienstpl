import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { KundeService } from "./../../kunden/kunde.service";
import { PersonService } from "./../../personen/person.service";
import { PlanService } from "./../plan.service";
import { PlanEditComponent } from "./plan-edit.component";

describe("PlanEditComponent", () => {
	let comp: PlanEditComponent;
	let fixture: ComponentFixture<PlanEditComponent>;
	let activatedRouteStub: any;
	let routerStub: any;
	let kundeServiceStub: any;
	let personServiceStub: any;
	let planServiceStub: any;

	beforeEach(() => {
		activatedRouteStub = {
			params: {
				subscribe: () => ({})
			}
		};
		routerStub = {
			navigate: () => ({})
		};
		kundeServiceStub = {
			getKunden: () => ({
				subscribe: () => ({})
			})
		};
		personServiceStub = {
			getPersonen: () => ({
				subscribe: () => ({})
			})
		};
		planServiceStub = {
			addPlan: () => ({
				subscribe: () => ({})
			}),
			editPlan: () => ({
				subscribe: () => ({})
			}),
			getPlan: () => ({
				subscribe: () => ({})
			})
		};
		TestBed.configureTestingModule({
			declarations: [ PlanEditComponent ],
			schemas: [ NO_ERRORS_SCHEMA ],
			providers: [
				{ provide: ActivatedRoute, useValue: activatedRouteStub },
				{ provide: Router, useValue: routerStub },
				{ provide: KundeService, useValue: kundeServiceStub },
				{ provide: PersonService, useValue: personServiceStub },
				{ provide: PlanService, useValue: planServiceStub }
			]
		});
		fixture = TestBed.createComponent(PlanEditComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

	it("months defaults to: [, , , , , , , , , , , ]", () => {
		expect(comp.months).toEqual([, , , , , , , , , , , ]);
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

	describe("ngOnInit", () => {
		it("makes expected calls", () => {
			spyOn(comp, "getMonth");
			spyOn(comp, "getYear");
			comp.ngOnInit();
			expect(comp.getMonth).toHaveBeenCalled();
			expect(comp.getYear).toHaveBeenCalled();
		});
	});

});
