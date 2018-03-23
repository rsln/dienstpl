import { Schicht } from './schicht';
export class Arbeitstag {

    constructor(public tag: Date, public schicht: Schicht, public _id?: string) {

    }
}
