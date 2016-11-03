import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { UserClient } from '../../providers/usuarios/user-client';
import { User } from '../../providers/usuarios/user';


/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  usuario: User;
  constructor(public navCtrl: NavController,
    private usrcli: UserClient,
    private toast: ToastController,
    private loadingCtrl: LoadingController) {
    this.usuario = new User();
  }

  ionViewDidLoad() {
    console.log('Hello Register Page');
  }

  save() {
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.usrcli.insert(this.usuario).subscribe(
      (res) => {
        loader.dismissAll();
        this.processResponse(res);
        this.navCtrl.pop();
      }
      , (err) => this.processResponse(false));
  }

  processResponse(success: boolean) {
    let msg;
    if (success) {
      msg = this.toast.create({ message: "Exito !", duration: 3000 });

    } else {
      msg = this.toast.create({ message: "Error !", duration: 3000 });
    }
    msg.present();
  }

}
