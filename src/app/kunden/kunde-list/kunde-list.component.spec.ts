import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { KundeService } from "../kunde.service";
import { Router } from "@angular/router";
import { KundeListComponent } from "./kunde-list.component";

describe("KundeListComponent", () => {
	let comp: KundeListComponent;
	let fixture: ComponentFixture<KundeListComponent>;
	let kundeServiceStub: any;
	let routerStub: any;

	beforeEach(() => {
		kundeServiceStub = {
			getKunden: () => ({
				subscribe: () => ({})
			})
		};
		routerStub = {
			navigate: () => ({})
		};
		TestBed.configureTestingModule({
			declarations: [ KundeListComponent ],
			schemas: [ NO_ERRORS_SCHEMA ],
			providers: [
				{ provide: KundeService, useValue: kundeServiceStub },
				{ provide: Router, useValue: routerStub }
			]
		});
		fixture = TestBed.createComponent(KundeListComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

	describe("onNewKunde", () => {
		it("makes expected calls", () => {
			spyOn(routerStub, "navigate");
			comp.onNewKunde();
			expect(routerStub.navigate).toHaveBeenCalled();
		});
	});

	describe("ngOnInit", () => {
		it("makes expected calls", () => {
			spyOn(kundeServiceStub, "getKunden");
			comp.ngOnInit();
			expect(kundeServiceStub.getKunden).toHaveBeenCalled();
		});
	});

});
