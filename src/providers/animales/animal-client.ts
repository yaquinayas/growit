import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/observable";
import { Animal } from './animal';

/*
  Generated class for the Animales provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AnimalClient {
    url: string = "http://192.168.0.12:8080/animales";
    // url: string = "http://localhost:8080/animales";
    //url: string = "http://10.0.2.2:8080/animales";
    constructor(public http: Http) { }


    insert(Animal: Animal) {
        return this.http.post(this.url, Animal).map(this.process).catch(this.processCatch);

    }

    getAllOfFinca(id: string): Observable<Animal[]> {
        return this.http.get(this.url + "/idfinca/" + id).map(this.processArray).catch(this.processCatch);
    }

    getAllOfFincaGender(id: string,sexo: string): Observable<Animal[]> {
        return this.http.get(this.url + "/idfinca/" + id + "/sexo/" + sexo).map(this.processArray).catch(this.processCatch);
    }

    getOne(id: string): Observable<Animal[]> {
        return this.http.get(this.url + "/" + id).map(this.processArray).catch(this.processCatch);
    }

    delete(id: string) {
        return this.http.delete(this.url + "/" + id).map(this.process).catch(this.processCatch);
    }
    update(id: string, animal: Animal){
        return this.http.put(this.url + "/" + id, animal).map(this.process).catch(this.processCatch);
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
