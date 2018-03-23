import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Person} from './person';
import {Headers, Http, Response} from '@angular/http';

@Injectable()
export class PersonService {

    private personen: Person[] = [];
    private headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});

    constructor(private http: Http) {}

    getPerson(id: string) {
        return this.http.get('http://localhost:3000/api/person/' + id)
            .map((response: Response) => {
                return <Person>response.json().obj;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getPersonen() {
        return this.http.get('http://localhost:3000/api/person')
            .map((response: Response) => {
                this.personen = <Array<Person>>response.json().obj;
                return this.personen;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deletePerson(person: Person) {
        var index;
        for (let p of this.personen) {
            if(p._id===person._id){
                index = this.personen.indexOf(p);
            }
        }
        return this.http.delete('http://localhost:3000/api/person/' + person._id)
            .map((response: Response) => {
                this.personen.splice(index, 1);
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    addPerson(person: Person) {
        const body = JSON.stringify(person);
        return this.http.post('http://localhost:3000/api/person', body, {headers: this.headers})
            .map((response: Response) => {
                const personFromResp = <Person>response.json().obj;
                this.personen.push(personFromResp);
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }


    editPerson(person: Person) {
        const body = JSON.stringify(person);
        return this.http.patch('http://localhost:3000/api/person/' + person._id, body, {headers: this.headers})
            .map((response: Response) => {
                const personFromResp = <Person>response.json().obj;
                const oldPerson = this.personen.find((item: any) => item._id === personFromResp._id);
                this.personen[this.personen.indexOf(oldPerson)] = personFromResp;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
}
