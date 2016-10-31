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
    url: string = "http://192.168.0.12:8080/fincas";
    // url: string = "http://localhost:8080/fincas";
    //url: string = "http://10.0.2.2:8080/fincas";
    constructor(public http: Http) { }


    getAllOfUsr(id: string): Observable<Finca[]> {
        return this.http.get(this.url + "/usr/" + id).map(this.processArray).catch(this.processCatch);
    }

    getOne(id: string): Observable<Finca[]> {
        return this.http.get(this.url + "/" + id).map(this.processArray).catch(this.processCatch);
    }
    insert(finca: Finca) {
        return this.http.post(this.url, finca).map(this.process).catch(this.processCatch);
    }
    delete(id: string) {
        return this.http.delete(this.url + "/" + id).map(this.process).catch(this.processCatch);
    }
    update(id: string, finca: Finca){
        return this.http.put(this.url + "/" + id, finca).map(this.process).catch(this.processCatch);
    }
    private process(res: Response) {
        let body = res.json();
        console.log(body);
        console.log(JSON.stringify(body));
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
