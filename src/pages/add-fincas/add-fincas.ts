import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, ToastController, Events } from 'ionic-angular';
import { Finca } from '../../providers/fincas/finca';
import { FincaClient } from '../../providers/fincas/finca-client';

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
    private toast: ToastController,
    private events: Events,
    private store: Storage) {
    this.finca = new Finca();
    store.get("id").then((value: number) => {
      this.finca.idusr = value;
      console.log("id es" + this.finca.idusr)
    });
  }

  ionViewDidLoad() {
    console.log('Hello AddFincas Page');
  }

  save() {
    this.fincas.insert(this.finca).subscribe(
      (res) => {
        this.processResponse(res);
        this.events.publish("reloadHome");
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
