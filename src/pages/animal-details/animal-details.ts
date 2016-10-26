import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, NavParams } from 'ionic-angular';
import { Animal } from '../../providers/animales/animal';
import { AnimalClient } from '../../providers/animales/animal-client';



/*
  Generated class for the AnimalDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-animal-details',
  templateUrl: 'animal-details.html'
})
export class AnimalDetailsPage {
  data: Animal[];

  constructor(public navCtrl: NavController,
    private params: NavParams,
    private client: AnimalClient) {
    this.data = [];
    let ida = params.get('ida');
    this.loadDetails(ida);
  }

  ionViewDidLoad() {
    console.log('Hello AnimalDetails Page');
  }

  loadDetails(id: String) {
    this.client.getOne(id).subscribe((res) => { this.data = res });
  }

  

}
