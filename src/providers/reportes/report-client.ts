import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/observable";
import { Reporte } from './reporte';

/*
  Generated class for the ReportClient provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ReportClient {
  url: string = "http://192.168.0.12:8080/reportes";
  //url: string = "http://10.0.2.2:8080/reportes";
  //url: string = "http://localhost:8080/reportes";
  constructor(public http: Http) {
    console.log('Hello ReportClient Provider');
  }

  getAllOfUsr(id: string): Observable<Reporte[]> {
    return this.http.get(this.url + "/idfinca/" + id).map(this.processArray).catch(this.processCatch);

  }

  getKinds(id: string, tipo: string) {
    return this.http.get(this.url + "/idfinca/" + id + "/tipo/" + tipo).map(this.processArray).catch(this.processCatch);
  }

  insert(reporte: Reporte) {
    return this.http.post(this.url, reporte).map(this.process).catch(this.processCatch);

  }

  getOne(id: string){
    return this.http.get(this.url + "/" + id).map(this.processArray).catch(this.processCatch);
  }
  delete(id: string) {
    return this.http.delete(this.url + "/" + id).map(this.process).catch(this.processCatch);
  }
  update(id: string, reporte: Reporte) {
    return this.http.put(this.url + "/" + id, reporte).map(this.process).catch(this.processCatch);
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
