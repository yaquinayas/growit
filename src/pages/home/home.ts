import { Component } from '@angular/core';
import {Storage} from '@ionic/Storage';
import { NavController, Events } from 'ionic-angular';

import {FincaClient} from '../../providers/fincas/finca-client';
import {Finca} from '../../providers/fincas/finca';

import {LoginPage} from '../login/login';
import {AddFincasPage} from '../add-fincas/add-fincas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   data:Finca[];
  constructor(public navCtrl: NavController, 
              private Storage: Storage,
              private client: FincaClient,
              private events: Events) {

                this.data = [];
                this.loadFarms();
                this.events.subscribe("reloadHome",()=>{
                  this.loadFarms();
                });

    
  }

  loadFarms(){
    console.log("entro");
    this.client.getAll().subscribe((res)=>{this.data = res});
  }

  CloseSession(){
    this.Storage.set("logged", false);
    this.navCtrl.push(LoginPage);

  }
  goToAddFincas(){
    this.navCtrl.push(AddFincasPage);
  }

}
