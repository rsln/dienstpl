import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { KundeService } from "../kunde.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { KundeDetailComponent } from "./kunde-detail.component";

describe("KundeDetailComponent", () => {
	let comp: KundeDetailComponent;
	let fixture: ComponentFixture<KundeDetailComponent>;
	let kundeServiceStub: any;
	let activatedRouteStub: any;
	let routerStub: any;

	beforeEach(() => {
		kundeServiceStub = {
			getKunde: () => ({}),
			deleteKunde: () => ({
				subscribe: () => ({})
			})
		};
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
		TestBed.configureTestingModule({
			declarations: [ KundeDetailComponent ],
			schemas: [ NO_ERRORS_SCHEMA ],
			providers: [
				{ provide: KundeService, useValue: kundeServiceStub },
				{ provide: ActivatedRoute, useValue: activatedRouteStub },
				{ provide: Router, useValue: routerStub }
			]
		});
		fixture = TestBed.createComponent(KundeDetailComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

	describe("ngOnInit", () => {
		it("makes expected calls", () => {
			spyOn(kundeServiceStub, "getKunde");
			comp.ngOnInit();
			expect(kundeServiceStub.getKunde).toHaveBeenCalled();
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
			spyOn(kundeServiceStub, "deleteKunde");
			spyOn(routerStub, "navigate");
			comp.onDelete();
			expect(kundeServiceStub.deleteKunde).toHaveBeenCalled();
			expect(routerStub.navigate).toHaveBeenCalled();
		});
	});

});
