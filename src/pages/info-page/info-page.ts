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
  machos: number;
  hembras: number;
  id: string;
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
    this.Genders(this.id, 'Macho');
    this.Genders(this.id, 'Hembra');
    if (this.machos == null){
      this.machos = 0;
    }
    if (this.hembras == null){
      this.hembras = 0;
    }
    if (this.cantidad == null){
      this.cantidad = 0;
    }
    

  }

  ionViewDidLoad() {
    console.log('Hello InfoPage Page');
  }

  loadDetails(id: string) {
    this.client.getOne(id).subscribe((res) => { this.data = res });
  }

  NumberOfAnimals(id: string) {
    this.animales.getAllOfFinca(id).subscribe((res) => {
      this.animal = res;
      this.cantidad = res.length;
      console.log(this.cantidad);
    });
  }

  Genders(id: string, sexo: string) {
    this.animales.getAllOfFincaGender(id, sexo).subscribe((res) => {
      if (sexo == 'Macho') {
        this.machos = res.length;
      } else {
        this.hembras = res.length;
      }
    });

  }

}
