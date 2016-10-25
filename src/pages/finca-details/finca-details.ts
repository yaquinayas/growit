import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events, NavParams } from 'ionic-angular';

import { FincaClient } from '../../providers/fincas/finca-client';
import { Finca } from '../../providers/fincas/finca';

//import { HomePage } from '../home/home';

/*
  Generated class for the FincaDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-finca-details',
  templateUrl: 'finca-details.html'
})
export class FincaDetailsPage {
  data: Finca[];
  id: String;
  
  constructor(public navCtrl: NavController,
    private Storage: Storage,
    private client: FincaClient,
    private events: Events,
    private navParams: NavParams) {

    this.data = [];
    Storage.get("id").then((value: String)=>{
       this.id = value;
       console.log("id es"+this.id)
        this.loadDetails(this.id);
    });
   
    
    


  }

  ionViewDidLoad() {
    console.log('Hello FincaDetails Page');
  }

  loadDetails(id:String) {
    console.log("entro");
    this.client.getOne(id).subscribe((res) => { this.data = res });
  }

}