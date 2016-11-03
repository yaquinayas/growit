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
  data: Animal;
  nac: string;

  constructor(public navCtrl: NavController,
    private params: NavParams,
    private client: AnimalClient) {
    this.data = new Animal;
    let ida = params.get('ida');
    this.loadDetails(ida);


  }

  ionViewDidLoad() {
    console.log('Hello AnimalDetails Page');
  }

  loadDetails(id: string) {
    this.client.getOne(id).subscribe((res) => {

      this.data = res;
      let all = JSON.stringify(this.data.nacimiento);
      let nac = all.split('T');
      let nac2 = nac[0].split('"');
      let nac3 = nac2[1];
      this.nac = nac3;
      
      

      //console.log(JSON.stringify(this.data));
    });
  }



}
