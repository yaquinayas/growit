import { Component } from '@angular/core';
import { NavController, ToastController, Events } from 'ionic-angular';

import { UserClient } from '../../providers/usuarios/user-client';
import { User } from '../../providers/usuarios/user';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';



import { Storage } from '@ionic/Storage';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user: String;
  pass: String;
  usuario: User;

  constructor(public navCtrl: NavController, private loc: Storage, private usrclient: UserClient, private toast: ToastController) {
    this.usuario = new User();
  }

  goToHome() {

    //this.loc.set("user",JSON.stringify({user: this.user, pass: this.pass}));  
    console.log("Usuario:" + this.user + " Password:" + this.pass);
    console.log(this.usuario);
    this.usrclient.login(this.usuario).subscribe(
      (res) => {
        console.log("res.success " + res.success);
        console.log("res.usrid " + res.userid);
        if (res.success) {
          this.loc.set("userid", res.userid);
          this.processResponse(res.success);
          this.navCtrl.push(HomePage, {
            idf: res.userid
          });
          this.loc.set("logged", true);
        } else {
          this.loc.set("logged", false);
          this.processResponse(res);
        }

      }
      , (err) => this.processResponse(false));
  }


  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

  processResponse(success: boolean) {
    let msg;
    if (success) {
      msg = this.toast.create({ message: "Exito !", duration: 3000 });

    } else {
      msg = this.toast.create({ message: "Datos incorrectos !", duration: 3000 });
    }
    msg.present();
  }

}

