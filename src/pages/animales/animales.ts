import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, Events, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { Animal } from '../../providers/animales/animal';
import { AnimalClient } from '../../providers/animales/animal-client';
import { AnimalDetailsPage } from '../animal-details/animal-details';
import { AddAnimalPage } from '../add-animal/add-animal';
import { EditAnimal } from '../edit-animal/edit-animal';

@Component({
  selector: 'page-about',
  templateUrl: 'animales.html'
})
export class AnimalsPage {
  data: Animal[];
  id: string;

  constructor(public navCtrl: NavController,
    private event: Events,
    private client: AnimalClient,
    private Storage: Storage,
    private alertCtrl: AlertController
  ) {
    this.data = [];
    Storage.get("idfinca").then((value: string) => {
      this.id = value;
      this.loadAnimals(this.id);
      this.event.subscribe("reloadAnimals", () => {
        this.loadAnimals(this.id);
      });
    });



  }

  ionViewDidLoad() {
    console.log('Hello Animal Page');
  }

  loadAnimals(id: string) {
    console.log("entro a cargar animales" + id);
    this.client.getAllOfFinca(id).subscribe((res) => { 
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
    this.client.delete(id).subscribe(
      (res) => {
        this.processResponce(res);
      },
      (err) => {
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
              this.loadAnimals(this.id);
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
              this.loadAnimals(this.id);
              console.log('OK');
            }
          }
        ]
      });
      confirm.present();

    }
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







}
