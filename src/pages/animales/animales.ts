import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events } from 'ionic-angular';

import { HomePage } from '../home/home';
import { Animal } from '../../providers/animales/animal';
import { AnimalClient } from '../../providers/animales/animal-client';
import { AnimalDetailsPage } from '../animal-details/animal-details';
import { AddAnimalPage } from '../add-animal/add-animal';

@Component({
  selector: 'page-about',
  templateUrl: 'animales.html'
})
export class AnimalsPage {
  data: Animal[];
  id: String;

  constructor(public navCtrl: NavController,
    private event: Events,
    private client: AnimalClient,
    private Storage: Storage) {
    this.data = [];
    this.id = ""
    Storage.get("idfinca").then((value: String) => {
      this.id = value;
      this.loadAnimals(this.id);
    });
    this.event.subscribe("reloadAnimals", () => {
        this.loadAnimals(this.id);
      });


  }

  ionViewDidLoad() {
    console.log('Hello Animal Page');
  }

  loadAnimals(id: String) {
    console.log("entro a cargar animales" + id);
    this.client.getAllOfFinca(id).subscribe((res) => { this.data = res });
  }

  goToAnimalDetails(id: String) {
    this.navCtrl.push(AnimalDetailsPage,{
      ida: id
    })
  }

  goToAdd(){
    this.navCtrl.push(AddAnimalPage);
  }






}
