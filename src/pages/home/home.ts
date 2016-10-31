import { Component, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events, NavParams, AlertController, MenuController, LoadingController } from 'ionic-angular';

import { FincaClient } from '../../providers/fincas/finca-client';
import { Finca } from '../../providers/fincas/finca';

import { LoginPage } from '../login/login';
import { AddFincasPage } from '../add-fincas/add-fincas';
import { FincaDetailsPage } from '../finca-details/finca-details';
import { TabsPage } from '../tabs-page/tabs-page';
import { UserProfile } from '../user-profile/user-profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: Finca[];
  idu: string;
  constructor(public navCtrl: NavController,
    private Storage: Storage,
    private client: FincaClient,
    private events: Events,
    private params: NavParams,
    private alertCtrl: AlertController,
    private menu: MenuController,
    private loadingCtrl: LoadingController) {

    this.menu.enable(true);
    this.data = [];
    let idparams = params.get('idf');
    if (idparams) {
      this.idu = idparams;
      this.loadFincas(idparams);
      this.events.subscribe("reloadHome", () => {
        console.log("page reloaded by event");
        this.loadFincas(idparams);
      });
    } else {
      Storage.get("userid").then((value: string) => {
        this.idu = value;
        let id = value;
        console.log("id es" + id);
        this.loadFincas(id);
        this.events.subscribe("reloadHome", () => {
          console.log("page reloaded by event");
          this.loadFincas(id);
        });
      });
    }   


  }

  ionViewDidLoad() {
    console.log('Hello Fincas Page');
  }

  loadFincas(id: string) {
    console.log("entro");
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.client.getAllOfUsr(id).subscribe(
      (res) => {
        loader.dismissAll();
        this.data = res
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
                this.events.publish("reloadHome");
                console.log('OK');
              }
            }
          ]
        });
        confirm.present();
      }
    );
  }

  goToProfile() {
    this.navCtrl.push(UserProfile);
  }

  CloseSession() {    
    this.Storage.set("logged", false);
    this.navCtrl.setRoot(LoginPage);

  }
  goToAddFincas() {
    this.navCtrl.push(AddFincasPage);
  }

  goToFincaDetails(id: string) {
    this.Storage.set("idfinca", id);
    console.log("id almacenado " + id);
    this.navCtrl.push(TabsPage, {
      idf: id
    }
    );
  }

  deleteFinca(id: string) {
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
        title: 'Finca eliminada',
        message: 'La finca fue eliminada correctamente',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.events.publish("reloadHome");              
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
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.events.publish("reloadHome");              
              console.log('OK');
            }
          }
        ]
      });
      confirm.present();

    }
  }

    ngOnDestroy() {
      this.events.unsubscribe("reloadHome");
   }

}
