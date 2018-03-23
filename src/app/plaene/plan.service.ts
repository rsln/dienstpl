import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Headers,   Http,  Response} from '@angular/http';
import {Plan} from './plan';
import {Arbeitszeiten} from './arbeitszeiten';
import {Arbeitstag} from './arbeitstag';
import {Schicht} from './schicht';
import {Person} from '../personen/person';
import {Kunde} from '../kunden/kunde';

@Injectable()
export class PlanService {

    private plaene: Plan[] = []
    private headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});

    constructor(private http: Http) {}

    getPlan(id: string) {
        return this.http.get('http://localhost:3000/api/plan/' + id)
            .map((response: Response) => {
                return this.createPlanFromJson(response.json().obj);
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getPlaene() {
        return this.http.get('http://localhost:3000/api/plan')
            .map((response: Response) => {
                const plaene = response.json().obj;
                let transformedPlan: Plan[] = [];
                for (let plan of plaene) {
                    transformedPlan.push(this.createPlanFromJson(plan));
                }
                this.plaene = transformedPlan;
                return this.plaene;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deletePlan(plan: Plan) {
        var index;
        //Herausfinden das Index des Plans
        for (let p of this.plaene) {
            if (p._id === plan._id) {
                index = this.plaene.indexOf(p);
            }
        }
        return this.http.delete('http://localhost:3000/api/person/' + plan._id)
            .map((response: Response) => {
                this.plaene.splice(index, 1);
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    addPlan(plan: Plan) {
        const body = JSON.stringify(plan);
        return this.http.post('http://localhost:3000/api/plan', body, {headers: this.headers})
            .map((response: Response) => {
                this.plaene.push(this.createPlanFromJson(response.json().obj));
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    // der Objekt wird in Json umgewandelt und an Plan Api geschickt 
    editPlan(plan: Plan) {
        const body = JSON.stringify(plan);
        return this.http.patch('http://localhost:3000/api/plan/' + plan._id, body, {headers: this.headers})
            .map((response: Response) => {
                //   Aktualisierte Plan Objekt wird zurückgeschickt
                const planFromResp = this.createPlanFromJson(response.json().obj);
                const oldPlan = this.plaene.find((item: any) => item._id === planFromResp._id);
                this.plaene[this.plaene.indexOf(oldPlan)] = planFromResp;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }


//Plan aus JSON erzeugt
    createPlanFromJson(planAsJson) {
        var schichten = new Array<Schicht>();
        for (let schicht of planAsJson.schichten) {
            schichten.push(<Schicht> schicht);
        }
        var arbeitszeiten = new Array<Arbeitszeiten>();
        for (let arbeitszeit of planAsJson.arbeitszeiten) {
            var arbeitstage = new Array<Arbeitstag>();
            for (let arbeitstag of arbeitszeit.arbeitstage) {
                var schicht = null;
                if (arbeitstag.schicht) {
                    schicht = schichten.find((item: any) => item._id === arbeitstag.schicht._id);
                }
                arbeitstage.push(new Arbeitstag(<Date> arbeitstag.tag, schicht, arbeitstag._id));
            }
            arbeitszeiten.push(new Arbeitszeiten(arbeitstage, <Person> arbeitszeit.person, arbeitszeit._id))
        }
        var plan = new Plan(
            planAsJson.month,
            planAsJson.year,
            <Kunde> planAsJson.kunde,
            arbeitszeiten,
            schichten,
            planAsJson._id);
        return plan;
    }
}
