import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events, NavParams } from 'ionic-angular';

import { FincaClient } from '../../providers/fincas/finca-client';
import { Finca } from '../../providers/fincas/finca';

import { LoginPage } from '../login/login';
import { AddFincasPage } from '../add-fincas/add-fincas';
import { FincaDetailsPage } from '../finca-details/finca-details';
import { TabsPage } from '../tabs-page/tabs-page';

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
    private params: NavParams) {

    this.data = [];
    let idparams = params.get('idf');
    if(idparams){
      this.loadFincas(idparams);
      this.events.subscribe("reloadHome", () => {
        this.loadFincas(idparams);
      });
    }else
    {Storage.get("userid").then((value: String) => {
      let id = value;
      console.log("id es" + id);
      this.loadFincas(id);
      this.events.subscribe("reloadHome", () => {
        this.loadFincas(id);
      });
    });}
    //let id = params.get('idf');



  }

  ionViewDidLoad() {
    console.log('Hello Fincas Page');
  }

  loadFincas(id: String) {
    console.log("entro");
    this.client.getAllOfUsr(id).subscribe((res) => { this.data = res });
  }

  CloseSession() {
    this.Storage.set("logged", false);
    this.navCtrl.push(LoginPage);

  }
  goToAddFincas() {
    this.navCtrl.push(AddFincasPage);
  }

  goToFincaDetails(id: String) {
    this.Storage.set("idfinca", id);
    console.log("id almacenado " + id);
    this.navCtrl.push(TabsPage, {
      idf: id
    }
    );
  }

}
