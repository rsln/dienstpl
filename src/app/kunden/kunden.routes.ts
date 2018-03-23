import { KundeStartComponent } from './kunde-start.component';
import { KundeDetailComponent } from './kunde-detail/kunde-detail.component';
import { KundeEditComponent } from './kunde-edit/kunde-edit.component';
import { KundeListComponent } from './kunde-list/kunde-list.component';
import { KundeItemComponent } from './kunde-list/kunde-item.component';

import { Routes } from '@angular/router';

export const KUNDEN_ROUTES: Routes=[
  { path: '', component: KundeStartComponent},
  { path: 'new', component: KundeEditComponent },
  { path: ':id', component: KundeDetailComponent },
  { path: ':id/edit', component: KundeEditComponent }
];