import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { KundeService } from "../kunde.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { KundeEditComponent } from "./kunde-edit.component";

describe("KundeEditComponent", () => {
	let comp: KundeEditComponent;
	let fixture: ComponentFixture<KundeEditComponent>;
	let kundeServiceStub: any;
	let activatedRouteStub: any;
	let routerStub: any;

	beforeEach(() => {
		kundeServiceStub = {
			addKunde: () => ({
				subscribe: () => ({})
			}),
			editKunde: () => ({
				subscribe: () => ({})
			}),
			getKunde: () => ({
				subscribe: () => ({})
			})
		};
		activatedRouteStub = {
			params: {
				subscribe: () => ({})
			}
		};
		routerStub = {
			navigate: () => ({})
		};
		TestBed.configureTestingModule({
			declarations: [ KundeEditComponent ],
			schemas: [ NO_ERRORS_SCHEMA ],
			providers: [
				{ provide: KundeService, useValue: kundeServiceStub },
				{ provide: ActivatedRoute, useValue: activatedRouteStub },
				{ provide: Router, useValue: routerStub }
			]
		});
		fixture = TestBed.createComponent(KundeEditComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

	describe("onSubmit", () => {
		it("makes expected calls", () => {
			spyOn(comp, "onNavigateBack");
			spyOn(kundeServiceStub, "addKunde");
			spyOn(kundeServiceStub, "editKunde");
			comp.onSubmit();
			expect(comp.onNavigateBack).toHaveBeenCalled();
			expect(kundeServiceStub.addKunde).toHaveBeenCalled();
			expect(kundeServiceStub.editKunde).toHaveBeenCalled();
		});
	});

	describe("onCancel", () => {
		it("makes expected calls", () => {
			spyOn(comp, "onNavigateBack");
			comp.onCancel();
			expect(comp.onNavigateBack).toHaveBeenCalled();
		});
	});

	describe("onNavigateBack", () => {
		it("makes expected calls", () => {
			spyOn(routerStub, "navigate");
			comp.onNavigateBack();
			expect(routerStub.navigate).toHaveBeenCalled();
		});
	});

	describe("ngOnInit", () => {
		it("makes expected calls", () => {
			spyOn(kundeServiceStub, "getKunde");
			comp.ngOnInit();
			expect(kundeServiceStub.getKunde).toHaveBeenCalled();
		});
	});

});
