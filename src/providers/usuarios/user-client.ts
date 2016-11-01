import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/observable";
import { User } from './user';

/*
  Generated class for the UserClient provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class UserClient {
    //url: string = "http://192.168.0.12:8080/usuarios";
     url: string = "http://localhost:8080/usuarios";
    //url: string = "http://10.0.2.2:8080/usuarios";
    constructor(public http: Http) { }

    login(User: User) {
        return this.http.post(this.url + "/login", User).map(this.processArray).catch(this.processCatch);
    }
    insert(User: User) {
        return this.http.post(this.url, User).map(this.process).catch(this.processCatch);

    }

    getOne(id: string): Observable<User[]> {
        return this.http.get(this.url + "/" + id).map(this.processArray).catch(this.processCatch);
    }
    private process(res: Response) {
        let body = res.json();
        return body.success;
    }

    private processArray(res: Response) {
        let body = res.json();
        console.log("body = " ,body);
        console.log("body.success = " + body.success);
        console.log("body.userid =" + body.userid);
        return body;
    }

    private processCatch() {
        return Observable.throw(true);
    }
}
