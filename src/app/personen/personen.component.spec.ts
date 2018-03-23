import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PersonenComponent } from "./personen.component";

describe("PersonenComponent", () => {
	let comp: PersonenComponent;
	let fixture: ComponentFixture<PersonenComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ PersonenComponent ],
			schemas: [ NO_ERRORS_SCHEMA ]
		});
		fixture = TestBed.createComponent(PersonenComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

});
