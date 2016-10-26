import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, ToastController, Events } from 'ionic-angular';
import { Animal } from '../../providers/animales/animal';
import { AnimalClient } from '../../providers/animales/animal-client';

/*
  Generated class for the AddAnimal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-animal',
  templateUrl: 'add-animal.html'
})
export class AddAnimalPage {
  animal: Animal;
  constructor(public navCtrl: NavController,
    private client: AnimalClient,
    private toast: ToastController,
    private events: Events,
    private store: Storage
  ) {
    this.animal = new Animal;
    store.get("idfinca").then((value: number)=>{
      this.animal.id_finca = value;
      console.log("id finca es "+ this.animal.id_finca)
    });
  }

  ionViewDidLoad() {
    console.log('Hello AddAnimal Page');
  }

  SetSexo(s: String) {
    console.log(s);
    delete this.animal.sexo; 
    this.animal.sexo = s;
    if(s = 'Macho'){
      this.animal.litros_diarios = "No aplica";
    }
  }

  SetTipo(t: String) {
    console.log(t);
    delete this.animal.tipo;    
    this.animal.tipo = t;
  }

  save() {
    console.log("animal añadido "+JSON.stringify(this.animal));
    this.client.insert(this.animal).subscribe(
      (res) => {
        this.processResponse(res);
        this.events.publish("reloadAnimals");
        this.navCtrl.pop();
      }
      , (err) => this.processResponse(false));
  }

  processResponse(success: boolean) {
    let msg;
    if (success) {
      msg = this.toast.create({ message: "Exito !", duration: 3000 });

    } else {
      msg = this.toast.create({ message: "Error !", duration: 3000 });
    }
    msg.present();
  }

}
