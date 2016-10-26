import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, NavParams } from 'ionic-angular';

import { FincaClient } from '../../providers/fincas/finca-client';
import { Finca } from '../../providers/fincas/finca';

import { Animal } from '../../providers/animales/animal';
import { AnimalClient } from '../../providers/animales/animal-client';

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
  animal: Animal[];
  cantidad: number;
  id: String;
  constructor(public navCtrl: NavController,
    private client: FincaClient,
    private animales: AnimalClient,
    private store: Storage,
    private params: NavParams) {
    this.data = [];
    this.animal = [];
    this.id = params.get('idf');
    this.loadDetails(this.id);
    this.NumberOfAnimals(this.id);
  }

  ionViewDidLoad() {
    console.log('Hello InfoPage Page');
  }

  loadDetails(id: String) {
    this.client.getOne(id).subscribe((res) => { this.data = res });
  }

  NumberOfAnimals(id: String) {
    this.animales.getAllOfFinca(id).subscribe((res) => { 
      this.animal = res;
      this.cantidad = res.length;
      console.log(this.cantidad);
       });
  }

}
