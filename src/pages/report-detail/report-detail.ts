import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, NavParams, Events, ToastController, LoadingController } from 'ionic-angular';

import { ReportClient } from '../../providers/reportes/report-client';
import { Reporte } from '../../providers/reportes/reporte';

/*
  Generated class for the ReportDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-report-detail',
  templateUrl: 'report-detail.html'
})
export class ReportDetailPage {
  data: Reporte[];
  id: string;
  ingresos: Reporte[];
  totingresos: number;
  egresos: Reporte[];
  totegresos: number;
  total: number;

  constructor(public navCtrl: NavController,
    private client: ReportClient,
    private store: Storage,
    private toast: ToastController,
    private events: Events,
    private params: NavParams,
    private loadingCtrl: LoadingController) {
    this.data = [];
    this.id = params.get('idf');
    this.totingresos = 0;
    this.totegresos = 0;
    this.getKinds(this.id, 'Ingreso');
    this.getKinds(this.id, 'Egreso');
    this.getAll(this.id);

    this.total = 0;
    this.events.subscribe("ReloadDetails", () => {
      this.totingresos = 0;
      this.totegresos = 0;
      this.total = 0;
      this.getKinds(this.id, 'Ingreso');
      this.getKinds(this.id, 'Egreso');
      this.getAll(this.id);

    });

  }

  ionViewDidLoad() {
    console.log('Hello ReportDetail Page');
  }

  getKinds(id: string, tipo: string) {
    this.client.getKinds(id, tipo).subscribe((res) => {
      if (tipo == 'Ingreso') {
        this.ingresos = res;
        for (let u of this.ingresos) {
          this.totingresos = this.totingresos + u.valor;
          this.total = this.total + u.valor;
        }
      } else {
        this.egresos = res;
        for (let u of this.egresos) {
          this.totegresos = this.totegresos + u.valor;
          this.total = this.total - u.valor;
        }
      }
    });
  }


  getAll(id: string) {
    console.log("entro");
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.client.getAllOfUsr(id).subscribe((res) => { 
      loader.dismissAll();
      this.data = res; },
      (err) => {
        loader.dismissAll();
        

      });
  }


}
