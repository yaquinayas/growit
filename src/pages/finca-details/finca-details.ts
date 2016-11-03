import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events, NavParams, AlertController, MenuController, LoadingController } from 'ionic-angular';

import { FincaClient } from '../../providers/fincas/finca-client';
import { Finca } from '../../providers/fincas/finca';

import { InfoPage } from '../info-page/info-page';
import { ReportDetailPage } from '../report-detail/report-detail';

//import { HomePage } from '../home/home';

/*
  Generated class for the FincaDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-finca-details',
  templateUrl: 'finca-details.html'
})
export class FincaDetailsPage {
  data: Finca;
  id: string;

  constructor(public navCtrl: NavController,
    private Storage: Storage,
    private client: FincaClient,
    private event: Events,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController) {

    
    this.data = new Finca;
    this.id = navParams.get('id');
    this.loadDetails(this.id);





  }

  ionViewDidLoad() {
    console.log('Hello FincaDetails Page');
  }

  loadDetails(id: string) {
    console.log("entro");
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.client.getOne(id).subscribe((res) => {
      loader.dismissAll();
      this.data = res;
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
      }
    );
  }

  goToInfo(id: string) {
    this.navCtrl.push(InfoPage, {
      idf: id
    });
  }

  goToReportDetail(id: string) {
    this.navCtrl.push(ReportDetailPage, {
      idf: id
    });
  }

  goToHome() {
    /*this.navCtrl.pop();
    this.navCtrl.setRoot(HomePage);*/
    this.event.publish("reloadHome")
    this.event.publish("goBack");
  }

  openMenu() {
   this.menuCtrl.open();
 }
}
