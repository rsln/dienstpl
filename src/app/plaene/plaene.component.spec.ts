import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PlaeneComponent } from "./plaene.component";

describe("PlaeneComponent", () => {
	let comp: PlaeneComponent;
	let fixture: ComponentFixture<PlaeneComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ PlaeneComponent ],
			schemas: [ NO_ERRORS_SCHEMA ]
		});
		fixture = TestBed.createComponent(PlaeneComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

});
