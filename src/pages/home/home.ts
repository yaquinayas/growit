import { Component, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events, NavParams, AlertController, MenuController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController,
    private Storage: Storage,
    private client: FincaClient,
    private events: Events,
    private params: NavParams,
    private alertCtrl: AlertController,
    private menu: MenuController) {

    
    this.data = [];
    let idparams = params.get('idf');
    if (idparams) {
      this.loadFincas(idparams);
      this.events.subscribe("reloadHome", () => {
        this.loadFincas(idparams);
      });
    } else {
      Storage.get("userid").then((value: string) => {
        let id = value;
        console.log("id es" + id);
        this.loadFincas(id);
        this.events.subscribe("reloadHome", () => {
          this.loadFincas(id);
        });
      });
    }
    console.log("date " + Date.now());
    //let id = params.get('idf');
    // let holi = new Date(Date.now()).toLocalestring();
    // console.log(holi);


  }

  ionViewDidLoad() {
    console.log('Hello Fincas Page');
  }

  loadFincas(id: string) {
    console.log("entro");
    this.client.getAllOfUsr(id).subscribe(
      (res) => {
        this.data = res
      },
      (err) => {

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

  goToProfile(){
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

  ngOnDestroy() {
    this.events.unsubscribe("reloadHome");
  }

}
