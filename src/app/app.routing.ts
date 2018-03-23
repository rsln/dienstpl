import {Routes, RouterModule} from '@angular/router';
import {PlaeneComponent} from './plaene/plaene.component';
import {PLAENE_ROUTES} from './plaene/plaene.routes';
import {PersonenComponent} from './personen/personen.component';
import {PERSONEN_ROUTES} from './personen/personen.routes';
import {KundenComponent} from './kunden/kunden.component';
import {KUNDEN_ROUTES } from './kunden/kunden.routes';




const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/plaene', pathMatch: 'full' },
    { path: 'plaene', component: PlaeneComponent, children: PLAENE_ROUTES  },
    { path: 'personen', component: PersonenComponent, children: PERSONEN_ROUTES},
    { path: 'kunden', component: KundenComponent, children: KUNDEN_ROUTES}
];

export const routing = RouterModule.forRoot(APP_ROUTES);