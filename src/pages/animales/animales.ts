import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events, AlertController, LoadingController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { Animal } from '../../providers/animales/animal';
import { AnimalClient } from '../../providers/animales/animal-client';
import { AnimalDetailsPage } from '../animal-details/animal-details';
import { AddAnimalPage } from '../add-animal/add-animal';
import { EditAnimal } from '../edit-animal/edit-animal';
import { ReportClient } from '../../providers/reportes/report-client';
import { Reporte } from '../../providers/reportes/reporte';

@Component({
  selector: 'page-about',
  templateUrl: 'animales.html'
})
export class AnimalsPage {
  data: Animal[];
  venta: Reporte;
  idf: string;
  value: string;

  constructor(public navCtrl: NavController,
    private event: Events,
    private client: AnimalClient,
    private Storage: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private clientr: ReportClient
  ) {
    this.data = [];
    this.venta = new Reporte;   
    Storage.get("idfinca").then((value: string) => {
      this.idf = value;
      this.loadAnimals(this.idf);
    });
    this.event.subscribe("reloadAnimals", () => {
      delete this.data;
      console.log("reloaded by event");
      Storage.get("idfinca").then((value: string) => {
        this.idf = value;
        this.loadAnimals(this.idf);
      });
    });



  }

  ionViewDidLoad() {
    console.log('Hello Animal Page');
  }

  loadAnimals(id: string) {
    console.log("entro");
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    console.log("entro a cargar animales" + id);
    this.client.getAllOfFinca(id).subscribe((res) => {
      loader.dismissAll();
      this.data = res;

    });
  }

  goToAnimalDetails(id: string) {
    this.navCtrl.push(AnimalDetailsPage, {
      ida: id
    })
  }

  goToAdd() {
    this.navCtrl.push(AddAnimalPage);
  }

  deleteAnimal(id: string) {
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.client.delete(id).subscribe(
      (res) => {
        loader.dismissAll();
        this.processResponce(res);
      },
      (err) => {
        loader.dismissAll();
        this.processResponce(false);
      }
    );
  }

  processResponce(res: boolean) {
    if (res) {
      let confirm = this.alertCtrl.create({
        title: 'Animal eliminado',
        message: 'El animal fue eliminado correctamente',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.event.publish("reloadAnimals");
              this.event.publish("reloadInfo");
              console.log('OK');
            }
          }
        ]
      });
      confirm.present();
    } else {
      let confirm = this.alertCtrl.create({
        title: 'Error',
        message: 'Hubo un problema al eliminar',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.event.publish("reloadAnimals");
              this.event.publish("reloadInfo");
              console.log('OK');
            }
          }
        ]
      });
      confirm.present();

    }
  }

  deletetype(id: string) {
    let confirm = this.alertCtrl.create({
      title: 'Tipo de eliminacion',
      message: '¿Eliminar o vender animal?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.confirmation(id);
            console.log("eliminar animal " + id);
          }
        },
        {
          text: 'Vender',
          handler: () => {
            this.SellAnimal(id);
          }
        }
      ]
    });
    confirm.present();

  }

  confirmation(id: string) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmación',
      message: '¿Esta seguro quiere eliminar el animal?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteAnimal(id);
            console.log("eliminar aniaml " + id);
          }
        },
        {
          text: 'cancelar',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  goToEdit(id: string) {
    this.navCtrl.push(EditAnimal, {
      ida: id
    })
  }

  ngOnDestroy() {
    this.event.unsubscribe("reloadAnimals");
  }

  SellAnimal(id: string) {
    let confirm = this.alertCtrl.create({
      title: 'Valor',
      message: 'Ingresa el valor de la venta',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'valor',
          placeholder: 'Valor',
          type: 'number',
          id: 'valor'
        },
      ],
      buttons: [
        {
          text: 'Aceptar',
          handler: valor => {
            console.log(valor);
            console.log(valor.valor);
             this.value = valor.valor;
           this.venta = new Reporte();
            this.saverep(id);

          }
        },
        {
          text: 'cancelar',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();       
    
    

  }

  deleteAnimalv(id: string) {
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    this.client.delete(id).subscribe(
      (res) => {
        loader.dismissAll();
        this.processResponcev(res);
      },
      (err) => {
        loader.dismissAll();
        this.processResponcev(false);
      }
    );
  }

  saverep(id: string) {
    this.venta.valor = parseInt(this.value);
    this.venta.tipo = 'Ingreso';
    this.venta.comentario = "venta de animal";
    this.venta.fecha = new Date(Date.now());
    this.venta.id_finca = parseInt(this.idf);

    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 100000000000000
    });
    loader.present();
    console.log(this.venta);
    this.clientr.insert(this.venta).subscribe(
      (res) => {
        loader.dismissAll();
        this.event.publish("ReloadReports");
        this.event.publish("ReloadDetails");
        this.deleteAnimalv(id);
      }
      , (err) => {
        loader.dismissAll();
        this.processResponcev(false);



      }
    );
  }

  processResponcev(res: boolean) {
    if (res) {
      let confirm = this.alertCtrl.create({
        title: 'Animal vendido',
        message: 'El animal fue eliminado correctamente',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.event.publish("reloadAnimals");
              this.event.publish("reloadInfo");
              this.event.publish("ReloadDetails");
              this.event.publish("ReloadReports");
              console.log('OK');
            }
          }
        ]
      });
      confirm.present();
    } else {
      let confirm = this.alertCtrl.create({
        title: 'Error',
        message: 'Hubo un problema al eliminar',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.event.publish("reloadAnimals");
              this.event.publish("reloadInfo");
              this.event.publish("ReloadDetails");
              this.event.publish("ReloadReports");
              console.log('OK');
            }
          }
        ]
      });
      confirm.present();

    }
  }







}
