import { PlanItemComponent } from './plan-list/plan-item.component';
import {Routes} from '@angular/router';
import {PlanEditComponent} from './plan-edit/plan-edit.component';
import {PlanListComponent} from './plan-list/plan-list.component';






export const PLAENE_ROUTES: Routes=[
  { path: 'new', component: PlanEditComponent },
  { path: ':id/edit', component: PlanEditComponent }

];
