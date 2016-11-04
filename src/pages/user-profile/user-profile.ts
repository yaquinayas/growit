import { Component } from '@angular/core';
import { NavController, LoadingController, Events, AlertController } from 'ionic-angular';
import { UserClient } from '../../providers/usuarios/user-client';
import { User } from '../../providers/usuarios/user';
import { FincaClient } from '../../providers/fincas/finca-client';
import { Finca } from '../../providers/fincas/finca';
import { Storage } from '@ionic/Storage';

import { EditUser } from '../edit-user/edit-user';

/*
  Generated class for the UserProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-user-profile',
    templateUrl: 'user-profile.html'
})
export class UserProfile {
    data: User;
    id: string;
    totfincas: number;
    constructor(public navCtrl: NavController,
        private usrclient: UserClient,
        private loc: Storage,
        private loadingCtrl: LoadingController,
        private event: Events,
        private alertCtrl: AlertController,
        private client: FincaClient) {

        this.data = new User;
        loc.get("userid").then((value: string) => {
            this.id = value;
            console.log("id es " + this.id);
            this.loadUser(this.id);
            this.loadfincas(this.id);
            // if (this.totfincas == null) {
            //     this.totfincas = 0;
            // }
        });
        event.subscribe("reloaduser", () => {
            this.data = new User;
            loc.get("userid").then((value: string) => {
                this.id = value;
                console.log("id es " + this.id);
                this.loadUser(this.id);
                this.loadfincas(this.id);
                // if (this.totfincas == null) {
                //     this.totfincas = 0;
                // }
            });
        });
    }

    ionViewDidLoad() {
        console.log('Hello UserProfile Page');
    }

    loadUser(id: string) {
        console.log("entro");
        let loader = this.loadingCtrl.create({
            content: "Cargando",
            duration: 100000000000000
        });
        loader.present();
        this.usrclient.getOne(id).subscribe(
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

    loadfincas(id: string) {
        this.client.getAllOfUsr(id).subscribe((res) => {
            this.totfincas = res.length;
        },
            (err) =>{
              this.totfincas = 0;
            });
    }

    goToEdit() {
        this.navCtrl.push(EditUser);
    }

}
