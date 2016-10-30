import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events, NavParams, ToastController } from 'ionic-angular';

import { ReportClient } from '../../providers/reportes/report-client';
import { Reporte } from '../../providers/reportes/reporte';

/*
  Generated class for the AddReports page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reports',
  templateUrl: 'add-reports.html'
})
export class AddReportsPage {
  reporte: Reporte;


  constructor(public navCtrl: NavController,
    private client: ReportClient,
    private store: Storage,
    private toast: ToastController,
    private events: Events,
    private params: NavParams) {
    this.reporte = new Reporte();
    store.get("idfinca").then((value: number) => {
      this.reporte.id_finca = value;
      console.log("id finca es" + this.reporte.id_finca)
    });   
    


  }

  ionViewDidLoad() {
    console.log('Hello Reports Page');
  }

  save() {
    this.client.insert(this.reporte).subscribe(
      (res) => {
        this.processResponse(res);    
        this.events.publish("ReloadDetails");
        this.navCtrl.setRoot(AddReportsPage);    
      }
      , (err) => this.processResponse(false)
    );
  }

  processResponse(success: boolean) {
    let msg;
    if (success) {
      msg = this.toast.create({ message: "Exito !", duration: 3000 });

    } else {
      msg = this.toast.create({ message: "Error !", duration: 3000 });
    }
    msg.present();
  }

  SetTipo(t: string) {
    console.log(t);
    delete this.reporte.tipo;
    this.reporte.tipo = t;
  }

}
