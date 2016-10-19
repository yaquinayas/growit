import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the AddFincas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-fincas',
  templateUrl: 'add-fincas.html'
})
export class AddFincasPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AddFincas Page');
  }

}
