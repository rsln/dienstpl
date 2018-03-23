import {Routes} from '@angular/router';
import {PersonStartComponent} from './person-start.component';
import {PersonDetailComponent} from './person-detail/person-detail.component';
import {PersonEditComponent} from './person-edit/person-edit.component';





export const PERSONEN_ROUTES: Routes=[
  { path: '', component: PersonStartComponent },
  { path: 'new', component: PersonEditComponent},
  { path: ':id', component: PersonDetailComponent},
  { path: ':id/edit', component: PersonEditComponent }

];
