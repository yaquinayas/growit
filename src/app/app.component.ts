import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import {Storage} from '@ionic/Storage';

import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  //rootPage = HomePage;
  rootPage: any;

  constructor(platform: Platform, private Storage: Storage) {

     Storage.get("logged").then((value: any)=>{
       if(value){
         this.rootPage = HomePage;
       }else{
         this.rootPage = LoginPage;
       }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
