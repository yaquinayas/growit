import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events, NavParams, AlertController } from 'ionic-angular';

import { ReportClient } from '../../providers/reportes/report-client';
import { Reporte } from '../../providers/reportes/reporte';

/*
  Generated class for the EditReport page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-report',
  templateUrl: 'edit-report.html'
})
export class EditReport {
  reporte: Reporte;
  data: Reporte[];
  idreporte: string;
  constructor(public navCtrl: NavController,
    private client: ReportClient,
    private store: Storage,
    private alertCtrl: AlertController,
    private events: Events,
    private params: NavParams) {
    this.data = [];
    this.idreporte = params.get("idreporte");
    this.reporte = new Reporte();
    store.get("idfinca").then((value: number) => {
      this.reporte.id_finca = value;
      console.log("id finca es " + this.reporte.id_finca)
    });

  }

  ionViewDidLoad() {
    console.log('Hello EdditReport Page');
  }

  loadDetail(id:string){
    this.client.getOne(this.idreporte).subscribe((res) => {
      this.data = res;         

    });
  }

  save(id: string) {
    this.client.update(id, this.reporte).subscribe(
      (res) => {
        this.processResponse(res);

      }
      , (err) => this.processResponse(false)
    );
  }

  processResponse(success: boolean) {
    let confirm;
    if (success) {
      confirm = this.alertCtrl.create({
        title: 'Reporte modificado Correctamente',
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
        message: 'Hubo un problema al modificar el reporte',
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
              this.save(this.idreporte);
              console.log('volver a intentar');
            }
          }
        ]
      })
    }
    confirm.present();
  }

}
