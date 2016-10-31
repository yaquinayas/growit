import { Component } from '@angular/core';
import { NavController, Events, LoadingController, AlertController } from 'ionic-angular';

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

  user: string;
  pass: string;
  usuario: User;

  constructor(public navCtrl: NavController,
    private loc: Storage,
    private usrclient: UserClient,    
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
    this.usuario = new User();
  }

  goToHome() {
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000,
      dismissOnPageChange: true
    });
    //this.loc.set("user",JSON.stringify({user: this.user, pass: this.pass}));  
    console.log("Usuario:" + this.user + " Password:" + this.pass);
    console.log(this.usuario);
    loader.present();
    this.usrclient.login(this.usuario).subscribe(
      (res) => {
        console.log("res.success " + res.success);
        console.log("res.usrid " + res.userid);
        if (res.success) {
          loader.dismiss();
          this.loc.set("userid", res.userid);          
          this.navCtrl.setRoot(HomePage, {
            idf: res.userid
          });
          this.loc.set("logged", true);
        } else {
          loader.dismiss();
          this.loc.set("logged", false);
          this.processResponse(false);
        }

      }
      , (err) => {

        loader.dismiss();
        this.problemConection();
      }
    );
  }


  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

  processResponse(success: boolean) {
    let confirm;
    if (success) {
      console.log('bien');

    } else {
      confirm = this.alertCtrl.create({
        title: 'Error',
        message: 'Hubo un problema al ingresar, verifica los datos ingresados e intenta nuevamente',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {

              console.log('OK');
            }
          }
        ]
      })
    }
    confirm.present();
  }

  problemConection() {
    let error = this.alertCtrl.create({
      title: 'Error',
      message: 'Hubo un problema al conectarse con el servidor, vuelve a intenar mas tarde',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('OK');
          }
        }
      ]
    });
    error.present();


  }

  presentLoading(activador: boolean) {
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 3000
    });
    loader.present();
  }

}

