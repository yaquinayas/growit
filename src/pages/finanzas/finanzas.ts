import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events, AlertController, LoadingController } from 'ionic-angular';
import { AddReportsPage } from '../add-reports/add-reports';
import { EditReport } from '../edit-report/edit-report';
import { ReportClient } from '../../providers/reportes/report-client';
import { Reporte } from '../../providers/reportes/reporte';
import { ReportInfo } from '../report-info/report-info';

/*
  Generated class for the Finanzas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-finanzas',
  templateUrl: 'finanzas.html'
})
export class FinanzasPage {
  data: Reporte[];
  idf: string;
  fecha: string;
  constructor(public navCtrl: NavController,
    private event: Events,
    private client: ReportClient,
    private Storage: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.data = [];
    Storage.get("idfinca").then((value: string) => {
      this.idf = value;
      this.loadReports(this.idf);
      this.event.subscribe("ReloadReports", () => {
        delete this.data;
        console.log("reloaded by event");
        this.loadReports(this.idf);
      });

    });
  }

  ionViewDidLoad() {
    console.log('Hello Finanzas Page');
  }

  loadReports(id: string) {
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    console.log("entro a cargar Reportes " + id);
    this.client.getAllOfUsr(id).subscribe((res) => {
      loader.dismissAll();
      this.data = res;
    });
  }

  goToDetail(id: string) {
    this.navCtrl.push(ReportInfo, {
      idreport: id
    })
  }

  goToAdd() {
    this.navCtrl.push(AddReportsPage);
  }

  goToEdit(id: string) {
    this.navCtrl.push(EditReport, {
      idreporte: id
    })
  }

  confirmation(id: string) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmación',
      message: '¿Esta seguro quiere eliminar el reporte?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteReport(id);
            console.log("eliminar reporte " + id);
          }
        },
        {
          text: 'cancelar',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  deleteReport(id: string) {
    this.client.delete(id).subscribe(
      (res) => {
        this.processResponce(res);
      },
      (err) => {
        this.processResponce(false);
      }
    );
  }

  processResponce(res: boolean) {
    if (res) {
      let confirm = this.alertCtrl.create({
        title: 'Reporte eliminado',
        message: 'El Reporte fue eliminado correctamente',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.event.publish("ReloadReports")
              console.log('OK');
            }
          }
        ]
      });
      confirm.present();
    } else {
      let confirm = this.alertCtrl.create({
        title: 'Error',
        message: 'Hubo un problema al eliminar',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.event.publish("ReloadReports")
              console.log('OK');
            }
          }
        ]
      });
      confirm.present();

    }
  }

  ngOnDestroy() {
    this.event.unsubscribe("ReloadReports");
  }

}
