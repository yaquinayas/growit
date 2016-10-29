import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, ToastController, Events, AlertController } from 'ionic-angular';
import { Animal } from '../../providers/animales/animal';
import { AnimalClient } from '../../providers/animales/animal-client';
import { Camera } from 'ionic-native';

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
    private store: Storage,
    private alertCtrl: AlertController    
  ) {
    this.animal = new Animal;
    this.animal.imagen = '';
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

  imagen() {
    let confirm = this.alertCtrl.create({
      title: 'Insertar imagen',
      message: 'Selecciona una imagen para subirla o tomala ahora ',
      buttons: [
        {
          text: 'Tomar',
          handler: () => {
            this.camara();
            console.log('Camara');
          }
        },
        {
          text: 'Seleccionar',
          handler: () => {
            this.galeria();
            console.log('Galeria');
          }
        }
      ]
    });
    confirm.present();
  }


  camara(){
    Camera.getPicture({quality: 100, destinationType: Camera.DestinationType.DATA_URL, saveToPhotoAlbum: true }).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 let base64Image = 'data:image/jpeg;base64,' + imageData;
 this.animal.imagen = base64Image;
 console.log(this.animal.imagen);
}, (err) => {
 // Handle error
});
  }

  galeria(){
    Camera.getPicture({destinationType: Camera.DestinationType.DATA_URL, sourceType: Camera.PictureSourceType.PHOTOLIBRARY }).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 let base64Image = 'data:image/jpeg;base64,' + imageData;
 this.animal.imagen = base64Image;
 console.log(this.animal.imagen);
}, (err) => {
 // Handle error
});
  }

}
