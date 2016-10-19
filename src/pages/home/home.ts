import { Component } from '@angular/core';
import {Storage} from '@ionic/Storage';

import { NavController } from 'ionic-angular';

import {LoginPage} from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private Storage: Storage) {
    
  }

  CloseSession(){
    this.Storage.set("logged", false);
    this.navCtrl.push(LoginPage);

  }

}
