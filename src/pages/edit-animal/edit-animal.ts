import { Component } from '@angular/core';
import { NavController, Events, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { Animal } from '../../providers/animales/animal';
import { AnimalClient } from '../../providers/animales/animal-client';
import { Camera } from 'ionic-native';


/*
  Generated class for the EditAnimal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-animal',
  templateUrl: 'edit-animal.html'
})
export class EditAnimal {
  animal: Animal;
  data: Animal;
  nac: string;
  photochanged: number;
  ida: string;
  selectedM: string;
  selectedH: string;
  selectedC: string;
  selectedL: string;

  constructor(public navCtrl: NavController,
    private client: AnimalClient,
    private events: Events,
    private store: Storage,
    private alertCtrl: AlertController,
    private params: NavParams,
    private loadingCtrl: LoadingController) {
    this.data = new Animal;
    this.animal = new Animal;
    this.photochanged = 0;
    let param = params.get('ida');
    this.ida = param;
    store.get("idfinca").then((value: number) => {
      this.animal.id_finca = value;
      console.log("id finca es " + this.animal.id_finca)
    });
    this.loadDetails(this.ida);
  }

  ionViewDidLoad() {
    console.log('Hello EditAnimal Page');
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
      if(this.data.sexo == 'Macho'){
        this.selectedM = 'true';
        this.selectedH = 'false';
      }else{
        this.selectedH = 'true';
        this.selectedM = 'false';
      }
      if(this.data.tipo == 'Leche'){
        this.selectedL = 'true';
        this.selectedC = 'false';
      }else{
        this.selectedC = 'true';
        this.selectedL = 'false';
      }
      let all = JSON.stringify(this.data);
      let nac = all.split(',');
      let nac2 = nac[4].split(':"');
      let nac3 = nac2[1].split('T');
      let nac4 = nac3[0].split('"');
      this.nac = nac4[0];     

      console.log("nac es " + nac3[0]);

         });
  }

  save() { 
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    if (this.animal.sexo == 'Macho') {
      delete this.animal.litros_diarios;
      this.animal.litros_diarios = "No aplica";
    }
    let changed: boolean = false;
    let pesonac: number;
    if(this.animal.peso_al_nacer){
      pesonac = this.animal.peso_al_nacer;
      changed = true;
    }else{
      pesonac = this.data.peso_al_nacer;
    }
    let peso: number;
    if(this.animal.peso){
      peso = this.animal.peso;
      changed = true;
    }else{
      peso = this.data.peso;
    }
    let nac: string;
    if(this.animal.nacimiento){
      nac = this.animal.nacimiento.toString();
      changed = true;
    }else{
      nac = this.data.nacimiento.toString();
    }

     if(changed){
       let date1 = new Date(nac);
    //let date2 = new Date("12/15/2010");
    let timeDiff = Math.abs(Date.now() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    this.animal.ganancia = (peso - pesonac) / diffDays;
     }
       
    this.client.update(this.ida,this.animal).subscribe(
      (res) => {
        loader.dismissAll();
        this.processResponse(res);

      }
      , (err) => {
        loader.dismissAll();
        this.processResponse(false);
      }
      );
  }

  processResponse(success: boolean) {
    let confirm;
    if (success) {
      confirm = this.alertCtrl.create({
        title: 'Animal Editado Correctamente',
        message: 'Los datos fueron ingresados',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.events.publish("reloadAnimals");
              this.events.publish("reloadInfo");
              this.navCtrl.pop();
              console.log('OK');
            }
          }
        ]
      });

    } else {
      confirm = this.alertCtrl.create({
        title: 'Error',
        message: 'Hubo un problema al editar el animal',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.events.publish("reloadAnimals");
              this.events.publish("reloadInfo");
              this.navCtrl.pop();
              console.log('OK');
            }
          },
          {
            text: 'Volver a intentar',
            handler: () => {
              this.save();
              console.log('volver a intentar');
            }
          }
        ]
      })
    }
    confirm.present();
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


  camara() {
    Camera.getPicture({ quality: 100, destinationType: Camera.DestinationType.DATA_URL, saveToPhotoAlbum: true }).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.animal.imagen = base64Image;
      this.photochanged = 1;
      
    }, (err) => {
      // Handle error
    });
  }

  galeria() {
    Camera.getPicture({ destinationType: Camera.DestinationType.DATA_URL, sourceType: Camera.PictureSourceType.PHOTOLIBRARY }).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.animal.imagen = base64Image;
      this.photochanged = 1;
      
    }, (err) => {
      // Handle error
    });
  }



}
