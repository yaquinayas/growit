import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events, NavParams, AlertController, LoadingController } from 'ionic-angular';

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
  data: Reporte;
  idreporte: string;
  selectedE: string;
  selectedI: string;
  constructor(public navCtrl: NavController,
    private client: ReportClient,
    private store: Storage,
    private alertCtrl: AlertController,
    private events: Events,
    private params: NavParams,
    private loadingCtrl: LoadingController) {
    this.data = new Reporte();
    this.idreporte = params.get("idreporte");
    this.reporte = new Reporte();
    store.get("idfinca").then((value: number) => {
      this.reporte.id_finca = value;
      console.log("id finca es " + this.reporte.id_finca)
    });
    this.loadDetail();
    

  }

  ionViewDidLoad() {
    console.log('Hello EdditReport Page');
  }

  loadDetail(){
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.client.getOne(this.idreporte).subscribe((res) => {
      loader.dismissAll();
      this.data = res;
      if(this.data.tipo == 'Ingreso'){
        this.selectedI = 'true';
        this.selectedE = 'false';
      }else{
        this.selectedI = 'true';
        this.selectedE = 'false';
      }


    },
      (err) => {
        loader.dismissAll();
        let confirm = this.alertCtrl.create({
          title: 'Error',
          message: 'Hubo un problema al cargar los datos',
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                console.log('OK');
              }
            }
          ]
        });
        confirm.present();
      });
  }

  save() {
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.reporte.id = this.data.id;
    this.client.update(this.idreporte, this.reporte).subscribe(
      (res) => {
        loader.dismissAll();
        this.processResponse(res);

      }
      , (err) => {
        loader.dismissAll();
        this.processResponse(false);}
    );
  }

  processResponse(success: boolean) {
    let confirm;
    if (success) {
      confirm = this.alertCtrl.create({
        title: 'Reporte modificado Correctamente',
        enableBackdropDismiss: false,
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
        enableBackdropDismiss: false,
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
