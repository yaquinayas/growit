import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/observable";
import { Finca } from './finca';

/*
  Generated class for the FincaClient provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class FincaClient {
    url: string = "http://localhost:8080/fincas";
    constructor(public http: Http) {}

    getAll(): Observable<Finca[]> {
        return this.http.get(this.url).map(this.processArray).catch(this.processCatch);
    }
    insert(finca:Finca){
    return this.http.post(this.url, finca).map(this.process).catch(this.processCatch);

  }
    private process(res: Response) {
        let body = res.json();
        return body.success;
    }

    private processArray(res: Response) {
        let body = res.json();
        return body;
    }

    private processCatch() {
        return Observable.throw(true);
    }
}