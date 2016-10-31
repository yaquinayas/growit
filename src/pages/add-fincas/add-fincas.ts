import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events, AlertController } from 'ionic-angular';
import { Finca } from '../../providers/fincas/finca';
import { FincaClient } from '../../providers/fincas/finca-client';
import { Camera } from 'ionic-native';

/*
  Generated class for the AddFincas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-fincas',
  templateUrl: 'add-fincas.html'
})
export class AddFincasPage {
  finca: Finca;
  constructor(public navCtrl: NavController,
    private fincas: FincaClient,
    private events: Events,
    private store: Storage,
    private alertCtrl: AlertController) {
    this.finca = new Finca;
    this.finca.imagen = '';
    store.get("userid").then((value: number) => {
      this.finca.idusr = value;
      console.log("id usr es" + this.finca.idusr)
    });
  }

  ionViewDidLoad() {
    console.log('Hello AddFincas Page');
  }

  save() {
    this.fincas.insert(this.finca).subscribe(
      (res) => {
        this.processResponse(res);

      }
      , (err) => this.processResponse(false));
  }

  processResponse(success: boolean) {
    let confirm;
    if (success) {
      confirm = this.alertCtrl.create({
        title: 'Finca Creada Correctamente',
        message: 'Los datos fueron ingresados',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.events.publish("reloadHome");
              this.navCtrl.pop();
              console.log('OK');
            }
          }
        ]
      });

    } else {
      confirm = this.alertCtrl.create({
        title: 'Error',
        message: 'Hubo un problema al crear la finca',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.events.publish("reloadHome");
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
      this.finca.imagen = base64Image;
      console.log(this.finca.imagen);
    }, (err) => {
      // Handle error
    });
  }

  galeria() {
    Camera.getPicture({ destinationType: Camera.DestinationType.DATA_URL, sourceType: Camera.PictureSourceType.PHOTOLIBRARY }).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.finca.imagen = base64Image;
      console.log(this.finca.imagen);
    }, (err) => {
      // Handle error
    });
  }

}
