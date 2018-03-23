import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Kunde} from './kunde';

@Injectable()
export class KundeService {

    private kunden: Kunde[] = [];

    private headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    private kundenUrl = 'api/kunden';  // URL to web api

    constructor(private http: Http) {}

    getKunde(id: string) {
        return this.http.get('http://localhost:3000/api/kunde/' + id)
            .map((response: Response) => {
                return <Kunde>response.json().obj;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getKunden() {
        return this.http.get('http://localhost:3000/api/kunde')
            .map((response: Response) => {
                this.kunden = <Array<Kunde>>response.json().obj;
                return this.kunden;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteKunde(kunde: Kunde) {
        var index;
        for (let k of this.kunden) {
            if (k._id === kunde._id) {
                index = this.kunden.indexOf(k);
            }
        }
        return this.http.delete('http://localhost:3000/api/kunde/' + kunde._id)
            .map((response: Response) => {
                this.kunden.splice(index, 1);
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }


    addKunde(kunde: Kunde) {
        const body = JSON.stringify(kunde);
        return this.http.post('http://localhost:3000/api/kunde', body, {headers: this.headers})
            .map((response: Response) => {
                this.kunden.push(<Kunde>response.json().obj);
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    editKunde(kunde: Kunde) {
        const body = JSON.stringify(kunde);
        return this.http.patch('http://localhost:3000/api/kunde/' + kunde._id, body, {headers: this.headers})
            .map((response: Response) => {
                const kundeFromResp = <Kunde>response.json().obj;
                const oldKunde = this.kunden.find((item: any) => item._id === kundeFromResp._id);
                this.kunden[this.kunden.indexOf(oldKunde)] = kundeFromResp;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
}
