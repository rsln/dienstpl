import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from "@angular/router";
import { PlanService } from "../plan.service";
import { PlanListComponent } from "./plan-list.component";

describe("PlanListComponent", () => {
	let comp: PlanListComponent;
	let fixture: ComponentFixture<PlanListComponent>;
	let routerStub: any;
	let planServiceStub: any;

	beforeEach(() => {
		routerStub = {
			navigate: () => ({})
		};
		planServiceStub = {
			getPlaene: () => ({
				subscribe: () => ({})
			})
		};
		TestBed.configureTestingModule({
			declarations: [ PlanListComponent ],
			schemas: [ NO_ERRORS_SCHEMA ],
			providers: [
				{ provide: Router, useValue: routerStub },
				{ provide: PlanService, useValue: planServiceStub }
			]
		});
		fixture = TestBed.createComponent(PlanListComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

	it("plaene defaults to: []", () => {
		expect(comp.plaene).toEqual([]);
	});

	describe("ngOnInit", () => {
		it("makes expected calls", () => {
			spyOn(planServiceStub, "getPlaene");
			comp.ngOnInit();
			expect(planServiceStub.getPlaene).toHaveBeenCalled();
		});
	});

	describe("onNewPlan", () => {
		it("makes expected calls", () => {
			spyOn(routerStub, "navigate");
			comp.onNewPlan();
			expect(routerStub.navigate).toHaveBeenCalled();
		});
	});

});
