import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Camera } from 'ionic-native';

import { UserClient } from '../../providers/usuarios/user-client';
import { User } from '../../providers/usuarios/user';


/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  usuario: User;
  constructor(public navCtrl: NavController,
    private usrcli: UserClient,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.usuario = new User();
  }

  ionViewDidLoad() {
    console.log('Hello Register Page');
  }

  save() {

    if (this.usuario.imagen == '') {
      delete this.usuario.imagen;
      this.usuario.imagen = "data:image/png;base64,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";

    }
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.usrcli.insert(this.usuario).subscribe(
      (res) => {
        loader.dismissAll();
        this.processResponse(res);
        this.navCtrl.pop();
      }
      , (err) => this.processResponse(false));
  }

  processResponse(success: boolean) {
    let confirm;
    if (success) {
      confirm = this.alertCtrl.create({
        title: 'Registros exitoso',
        message: 'Ahora puede ingresar al sistema',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {                          
              this.navCtrl.pop();
              console.log('OK');
            }
          }
        ]
      });

    } else {
      confirm = this.alertCtrl.create({
        title: 'Error',
        message: 'Hubo un problema al guardar los datos',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {                          
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
      this.usuario.imagen = base64Image;
      console.log(this.usuario.imagen);
    }, (err) => {
      // Handle error
    });
  }

  galeria() {
    Camera.getPicture({ destinationType: Camera.DestinationType.DATA_URL, sourceType: Camera.PictureSourceType.PHOTOLIBRARY }).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.usuario.imagen = base64Image;
      console.log(this.usuario.imagen);
    }, (err) => {
      // Handle error
    });
  }

}
