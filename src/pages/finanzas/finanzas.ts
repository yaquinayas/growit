import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Finanzas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-finanzas',
  templateUrl: 'finanzas.html'
})
export class FinanzasPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Finanzas Page');
  }

}
