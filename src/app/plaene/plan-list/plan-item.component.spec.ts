import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PlanService } from '../plan.service';
import { PlanItemComponent } from './plan-item.component';

describe('PlanItemComponent', () => {
    let comp: PlanItemComponent;
    let fixture: ComponentFixture<PlanItemComponent>;
    let activatedRouteStub: any;
    let routerStub: any;
    let planServiceStub: any;

    beforeEach(() => {
        activatedRouteStub = {};
        routerStub = {
            navigate: () => ({})
        };
        planServiceStub = {
            editPlan: () => ({
                subscribe: () => ({})
            }),
            deletePlan: () => ({
                subscribe: () => ({})
            })
        };
        TestBed.configureTestingModule({
            declarations: [ PlanItemComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: Router, useValue: routerStub },
                { provide: PlanService, useValue: planServiceStub }
            ]
        });
        fixture = TestBed.createComponent(PlanItemComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('butDisabled defaults to: false', () => {
        expect(comp.butDisabled).toEqual(false);
    });

    describe('checkPerson', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'schichtOverlap');
            spyOn(comp, 'getTimeFromSchicht');
            //comp.checkPerson();
            expect(comp.schichtOverlap).toHaveBeenCalled();
            expect(comp.getTimeFromSchicht).toHaveBeenCalled();
        });
    });

    describe('onChange', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'checkPerson');
            //comp.onChange();
            expect(comp.checkPerson).toHaveBeenCalled();
        });
    });

    describe('ngOnInit', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'createRange');
            comp.ngOnInit();
            expect(comp.createRange).toHaveBeenCalled();
        });
    });

    describe('save', () => {
        it('makes expected calls', () => {
            spyOn(planServiceStub, 'editPlan');
            comp.save();
            expect(planServiceStub.editPlan).toHaveBeenCalled();
        });
    });

    describe('onEdit', () => {
        it('makes expected calls', () => {
            spyOn(routerStub, 'navigate');
            comp.onEdit();
            expect(routerStub.navigate).toHaveBeenCalled();
        });
    });

    describe('onDelete', () => {
        it('makes expected calls', () => {
            spyOn(routerStub, 'navigate');
            spyOn(planServiceStub, 'deletePlan');
            comp.onDelete();
            expect(routerStub.navigate).toHaveBeenCalled();
            expect(planServiceStub.deletePlan).toHaveBeenCalled();
        });
    });

    describe('onCancel', () => {
        it('makes expected calls', () => {
            spyOn(routerStub, 'navigate');
            comp.onCancel();
            expect(routerStub.navigate).toHaveBeenCalled();
        });
    });


});
