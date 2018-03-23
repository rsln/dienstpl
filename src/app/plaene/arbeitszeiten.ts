import { Person } from '../personen/person';
import { Arbeitstag } from './arbeitstag';
export class Arbeitszeiten {

    constructor(public arbeitstage: Arbeitstag[], public person: Person, public _id?: string){

    }
}
