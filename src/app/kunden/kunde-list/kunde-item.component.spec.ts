import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { KundeItemComponent } from "./kunde-item.component";

describe("KundeItemComponent", () => {
	let comp: KundeItemComponent;
	let fixture: ComponentFixture<KundeItemComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ KundeItemComponent ],
			schemas: [ NO_ERRORS_SCHEMA ]
		});
		fixture = TestBed.createComponent(KundeItemComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

});
