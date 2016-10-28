import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { FincaDetailsPage } from '../finca-details/finca-details';
import { AnimalsPage } from '../animales/animales';
import { ContactPage } from '../contact/contact';
import { AddReportsPage } from '../add-reports/add-reports';
/*
  Generated class for the TabsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.

  B64
  fs buffer
*/
@Component({
  selector: 'page-tabs-page',
  templateUrl: 'tabs-page.html'
})
export class TabsPage implements OnDestroy {


  tab1Root: any = FincaDetailsPage;
  tab2Root: any = AnimalsPage;
  tab3Root: any = ContactPage;
  tab4Root: any = AddReportsPage;
  idf: String;

  constructor(public navCtrl: NavController,
    private params: NavParams, private event: Events) {
    this.idf = params.get('idf');
    console.log("tabs " + this.idf);
    event.subscribe("goBack", () => {
      this.navCtrl.pop();
    });

  }
  ngOnDestroy() {
    this.event.unsubscribe("goBack");
  }







}
