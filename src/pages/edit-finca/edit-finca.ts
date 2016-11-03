import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { Finca } from '../../providers/fincas/finca';
import { FincaClient } from '../../providers/fincas/finca-client';
import { Camera } from 'ionic-native';

/*
  Generated class for the EditFinca page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-finca',
  templateUrl: 'edit-finca.html'
})
export class EditFinca {
  data: Finca;
  finca: Finca;
  id: string;
  photochanged: number;
  constructor(public navCtrl: NavController,
    private client: FincaClient,
    private events: Events,
    private store: Storage,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController) {
    this.data = new Finca;
    this.finca = new Finca;   
    this.photochanged = 0;
    this.id = navParams.get('idfinca');
    this.loadDetails(this.id);
    
  }

  loadDetails(id: string) {
    console.log("entro");
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.client.getOne(id).subscribe((res) => {
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
      }
    );
  }

  ionViewDidLoad() {
    console.log('Hello EditFinca Page');
  }

  save() { 
       
    this.client.update(this.id,this.finca).subscribe(
      (res) => {
        this.processResponse(res);

      }
      , (err) => this.processResponse(false));
  }

  processResponse(success: boolean) {
    let confirm;
    if (success) {
      confirm = this.alertCtrl.create({
        title: 'Finca Editada Correctamente',
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
        message: 'Hubo un problema al editar la finca',
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
      this.photochanged = 1;
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
      this.photochanged = 1;
      console.log(this.finca.imagen);
    }, (err) => {
      // Handle error
    });
  }

}
