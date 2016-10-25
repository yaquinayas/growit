import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, NavParams } from 'ionic-angular';

import { FincaClient } from '../../providers/fincas/finca-client';
import { Finca } from '../../providers/fincas/finca';

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
  data: Finca[];
  id: String;
  constructor(public navCtrl: NavController,
    private client: FincaClient,
    private store: Storage,
    private params: NavParams) {
    this.data = [];
    this.id = params.get('idf');
    this.loadDetails(this.id);
  }

  ionViewDidLoad() {
    console.log('Hello InfoPage Page');
  }

  loadDetails(id:String) {    
    this.client.getOne(id).subscribe((res) => { this.data = res });
  }

}
