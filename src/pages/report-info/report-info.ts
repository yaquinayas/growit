import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { ReportClient } from '../../providers/reportes/report-client';
import { Reporte } from '../../providers/reportes/reporte';

/*
  Generated class for the ReportInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-report-info',
  templateUrl: 'report-info.html'
})
export class ReportInfo {
  data: Reporte;
  idreport: string;
  fecha: string;
  constructor(public navCtrl: NavController,
    private client: ReportClient,
    private store: Storage,
    private alertCtrl: AlertController,
    private events: Events,
    private params: NavParams,
    private loadingCtrl: LoadingController) {
      this.data = new Reporte;
      this.idreport = params.get("idreport");
      this.load();
      
     }

  ionViewDidLoad() {
    console.log('Hello ReportInfo Page');
  }

  load(){
    console.log("entro");
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.client.getOne(this.idreport).subscribe((res) =>{
      loader.dismissAll();
      this.data = res;
      let all = JSON.stringify(this.data.fecha);
      let nac = all.split('T');
      let nac2 = nac[0].split('"');
      let nac3 = nac2[1];
      this.fecha = nac3;
    })
  }

}
