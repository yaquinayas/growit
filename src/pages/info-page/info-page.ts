import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the InfoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-info-page',
  templateUrl: 'info-page.html'
})
export class InfoPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello InfoPage Page');
  }

}
