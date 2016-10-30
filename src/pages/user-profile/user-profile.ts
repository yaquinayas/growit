import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserClient } from '../../providers/usuarios/user-client';
import { User } from '../../providers/usuarios/user';

import { Storage } from '@ionic/Storage';

/*
  Generated class for the UserProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfile {

  constructor(public navCtrl: NavController,
    private usrclient: UserClient,
    private loc: Storage) { }

  ionViewDidLoad() {
    console.log('Hello UserProfile Page');
  }

}
