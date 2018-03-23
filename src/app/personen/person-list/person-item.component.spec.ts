import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PersonItemComponent } from "./person-item.component";

describe("PersonItemComponent", () => {
	let comp: PersonItemComponent;
	let fixture: ComponentFixture<PersonItemComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ PersonItemComponent ],
			schemas: [ NO_ERRORS_SCHEMA ]
		});
		fixture = TestBed.createComponent(PersonItemComponent);
		comp = fixture.componentInstance;
	});

	it("can load instance", () => {
		expect(comp).toBeTruthy();
	});

});
