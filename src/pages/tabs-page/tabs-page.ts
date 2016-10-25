import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  
}
