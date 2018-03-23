import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { KundenComponent } from "./kunden.component";

describe("KundenComponent", () => {
	let comp: KundenComponent;
	let fixture: ComponentFixture<KundenComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ KundenComponent ],
			schemas: [ NO_ERRORS_SCHEMA ]
		});
		fixture = TestBed.createComponent(KundenComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

});
