import { Component } from '@angular/core';
import { NavController, Events, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { UserClient } from '../../providers/usuarios/user-client';
import { User } from '../../providers/usuarios/user';
import { Camera } from 'ionic-native';

/*
  Generated class for the EditUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html'
})
export class EditUser {
  data: User;
  usuario: User;
  oldpass: string;
  id: string;
  photochanged: number;
  
  

  constructor(public navCtrl: NavController,
    private events: Events,
    private store: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private client: UserClient) { 
      this.data = new User();
      this.usuario = new User();
      this.photochanged = 0;
      store.get("userid").then((value: string) =>{
        this.usuario.id = parseInt(value);
        this.id = value;
        this.loadUser(this.id)
      });

    }

  ionViewDidLoad() {
    console.log('Hello EditUser Page');
  }

  loadUser(id: string) {
    console.log("entro");
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.client.getOne(id).subscribe(
      (res) => { 
        loader.dismissAll();  
        this.data = res;
       },
      (err) => {
        loader.dismissAll();
        let confirm = this.alertCtrl.create({
          title: 'Error',
          message: 'Hubo un problema al cargar los datos',
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                console.log('OK');
              }
            }
          ]
        });
        confirm.present();
      });
  }

  save() {
    if(this.oldpass == this.data.pass){
      let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.client.update(this.id,this.usuario).subscribe(
      (res) => {
        loader.dismissAll();
        this.processResponse(res);        
      }
      , (err) => this.processResponse(false));
  }else{  
    let confirm;
    confirm = this.alertCtrl.create({
        title: 'Datos incorrectos',
        message: 'La contraseña anterior es incorrecta',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {              
              console.log('OK');
            }
          }
        ]
      });
      confirm.present();
  }
  
    }
    

  processResponse(success: boolean) {
    let confirm;
    if (success) {
      confirm = this.alertCtrl.create({
        title: 'Edición exitosa',
        message: 'Los datos fueron modificados sin errores',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.events.publish("reloaduser");              
              this.navCtrl.pop();
              console.log('OK');
            }
          }
        ]
      });

    } else {
      confirm = this.alertCtrl.create({
        title: 'Error',
        message: 'Hubo un problema al modificar los datos',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.events.publish("reloaduser");              
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
      this.photochanged = 1;
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
      this.photochanged = 1;
      console.log(this.usuario.imagen);
    }, (err) => {
      // Handle error
    });
  }

}
