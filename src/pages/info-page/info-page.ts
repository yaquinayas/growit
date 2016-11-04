import { Component, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, NavParams, Events, LoadingController } from 'ionic-angular';

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
  data: Finca;
  animal: Animal[];
  cantidad: number;
  machos: number;
  hembras: number;
  id: string;
  litros: number;
  constructor(public navCtrl: NavController,
    private client: FincaClient,
    private animales: AnimalClient,
    private store: Storage,
    private params: NavParams,
    private event: Events,
    private loadingCtrl: LoadingController) {
    this.data = new Finca;
    this.animal = [];

    this.id = params.get('idf');
    this.loadDetails(this.id);
    this.NumberOfAnimals(this.id);
    this.Genders(this.id, 'Macho');
    this.Genders(this.id, 'Hembra');
    if (this.machos == null) {
      this.machos = 0;
    }
    if (this.hembras == null) {
      this.hembras = 0;
    }
    this.event.subscribe("reloadInfo", () => {
      this.loadDetails(this.id);
      this.NumberOfAnimals(this.id);
      this.Genders(this.id, 'Macho');
      this.Genders(this.id, 'Hembra');
      if (this.machos == null) {
        this.machos = 0;
      }
      if (this.hembras == null) {
        this.hembras = 0;
      }
    });



  }

  ionViewDidLoad() {
    console.log('Hello InfoPage Page');
  }

  loadDetails(id: string) {
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.client.getOne(id).subscribe((res) => { 
      loader.dismissAll();
      this.data = res;
     });
  }

  NumberOfAnimals(id: string) {
    this.animales.getAllOfFinca(id).subscribe((res) => {
      this.animal = res;
      this.cantidad = res.length;
      console.log(this.cantidad);
    });
    if (this.cantidad == null) {
      this.cantidad = 0;
    }
  }

  Genders(id: string, sexo: string) {
    this.animales.getAllOfFincaGender(id, sexo).subscribe((res) => {
      if (sexo == 'Macho') {
        this.machos = res.length;
      } else {
        this.hembras = res.length;
        let u: any;
        this.litros = 0;        
        for (u of res) {
         this.litros = this.litros + parseInt(u.litros_diarios);
        console.log("parseInt ", parseInt(u.litros_diarios));
        console.log("litros ", this.litros)
        }
      }
    });

  }

  ngOnDestroy() {
    this.event.unsubscribe("reloadAnimals");
  }

}
