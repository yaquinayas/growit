import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
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
  data: User;

  constructor(public navCtrl: NavController,
    private usrclient: UserClient,
    private loc: Storage,
    private loadingCtrl: LoadingController) {
    this.data = new User;
    loc.get("userid").then((value: string) => {
      let id = value;
      console.log("id es " + id);
      this.loadUser(id);
    });
  }

  ionViewDidLoad() {
    console.log('Hello UserProfile Page');
  }

  loadUser(id: string) {
    console.log("entro");
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.usrclient.getOne(id).subscribe(
      (res) => { 
        loader.dismissAll();  
        this.data = res;
       });
  }


}
