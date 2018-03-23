  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';

import { PersonListComponent } from './personen/person-list/person-list.component';
import { PersonItemComponent } from './personen/person-list/person-item.component';
import { PersonenComponent } from './personen/personen.component';
import { PersonService } from './personen/person.service';
import { PersonDetailComponent } from './personen/person-detail/person-detail.component';
import { PersonEditComponent } from './personen/person-edit/person-edit.component';
import { PlaeneComponent } from './plaene/plaene.component';
import { PlanService } from './plaene/plan.service';
import { PlanListComponent } from './plaene/plan-list/plan-list.component';
import { PlanItemComponent } from './plaene/plan-list/plan-item.component';
import { PlanEditComponent } from './plaene/plan-edit/plan-edit.component';
import { PersonStartComponent } from './personen/person-start.component';
import { routing } from './app.routing';
import { KundenComponent } from './kunden/kunden.component';
import { KundeService } from './kunden/kunde.service';
import { KundeListComponent } from './kunden/kunde-list/kunde-list.component';
import { KundeItemComponent } from './kunden/kunde-list/kunde-item.component';
import { KundeEditComponent } from './kunden/kunde-edit/kunde-edit.component';
import { KundeDetailComponent } from './kunden/kunde-detail/kunde-detail.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { KundeStartComponent } from './kunden/kunde-start.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PersonListComponent,
    PersonItemComponent,
    PersonenComponent,
    PersonDetailComponent,
    PersonEditComponent,
    PlaeneComponent,
    PlanListComponent,
    PlanItemComponent,
    PlanEditComponent,
    PersonStartComponent,
    KundenComponent,
    KundeListComponent,
    KundeItemComponent,
    KundeEditComponent,
    KundeDetailComponent,
    DropdownDirective,
    KundeStartComponent,

  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,



  ],
  
  providers: [PersonService, PlanService, KundeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
