import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events, NavParams, AlertController, LoadingController } from 'ionic-angular';

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
    private alertCtrl: AlertController,
    private events: Events,
    private params: NavParams,
    private loadingCtrl: LoadingController) {
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
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.client.insert(this.reporte).subscribe(
      (res) => {
        loader.dismissAll();
        this.processResponse(res);

      }
      , (err) => {
        loader.dismissAll();
        this.processResponse(false);
      }
    );
  }

  processResponse(success: boolean) {
    let confirm;
    if (success) {
      confirm = this.alertCtrl.create({
        title: 'Reporte Añadido Correctamente',
        message: 'Los datos fueron ingresados sin errores',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.events.publish("ReloadDetails");
              this.events.publish("ReloadReports");
              this.navCtrl.pop();
              console.log('OK');
            }
          }
        ]
      });

    } else {
      confirm = this.alertCtrl.create({
        title: 'Error',
        message: 'Hubo un problema al añadir el reporte',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.events.publish("ReloadDetails");
              this.events.publish("ReloadReports");
              this.navCtrl.pop();
              console.log('OK');
            }
          },
          {
            text: 'Volver a intentar',
            handler: () => {
              this.save();
              console.log('volver a intentar');
            }
          }
        ]
      })
    }
    confirm.present();
  }
  

}
