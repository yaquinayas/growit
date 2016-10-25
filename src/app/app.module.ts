import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {AddFincasPage} from '../pages/add-fincas/add-fincas';
import {FincaDetailsPage} from '../pages/finca-details/finca-details';
import {InfoPage} from '../pages/info-page/info-page';
import {TabsPage} from '../pages/tabs-page/tabs-page';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import {FincaClient} from '../providers/fincas/finca-client';
import {UserClient} from '../providers/usuarios/user-client';

import {Storage} from '@ionic/Storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AddFincasPage,
    FincaDetailsPage,
    TabsPage,
    AboutPage,
    ContactPage,
    InfoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AddFincasPage,
    FincaDetailsPage,
    TabsPage,
    AboutPage,
    ContactPage,
    InfoPage
  ],
  providers: [
    Storage,
    FincaClient,
    UserClient
  ]
})
export class AppModule {}
