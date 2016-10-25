import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {FincaDetailsPage} from '../finca-details/finca-details';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
/*
  Generated class for the TabsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs-page',
  templateUrl: 'tabs-page.html'
})
export class TabsPage {


  tab1Root: any = FincaDetailsPage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  idf: String;

  constructor(public navCtrl: NavController,
  private params: NavParams) {
    this.idf = params.get('idf');
    console.log("tabs "+this.idf);
    
  }

  
}
