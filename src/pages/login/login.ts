import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from '../home/home';
import {RegisterPage} from '../register/register';

import {Storage} from '@ionic/Storage';
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

  user:String;
  pass:String;

  constructor(public navCtrl: NavController, private loc:Storage) {}
 
  goToHome(){
    console.log("Usuario:"+this.user+" Password:"+this.pass);
    this.loc.set("logged", true);
    this.loc.set("user",JSON.stringify({user: this.user, pass: this.pass}));
    this.navCtrl.push(HomePage);
  }
  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }

}

