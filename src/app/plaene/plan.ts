import {Arbeitszeiten} from './arbeitszeiten';
import {Schicht} from './schicht';
import {KundeService} from './../kunden/kunde.service';
import {Kunde} from '../kunden/kunde';
import {Person} from '../personen/person';




export class Plan {
   
    constructor(public month: number, public year: number, public kunde: Kunde,
        public arbeitszeiten: Arbeitszeiten[], public schichten: Schicht[], public _id?: string) {

    }



}
