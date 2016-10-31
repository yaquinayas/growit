import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
//pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AddFincasPage } from '../pages/add-fincas/add-fincas';
import { FincaDetailsPage } from '../pages/finca-details/finca-details';
import { InfoPage } from '../pages/info-page/info-page';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { AnimalsPage } from '../pages/animales/animales';
import { ContactPage } from '../pages/contact/contact';
import { AnimalDetailsPage } from '../pages/animal-details/animal-details';
import { AddAnimalPage } from '../pages/add-animal/add-animal';
import { AddReportsPage } from '../pages/add-reports/add-reports';
import { FinanzasPage } from '../pages/finanzas/finanzas';
import { ReportDetailPage } from '../pages/report-detail/report-detail';
import { UserProfile } from '../pages/user-profile/user-profile';
//providers
import { FincaClient } from '../providers/fincas/finca-client';
import { UserClient } from '../providers/usuarios/user-client';
import { AnimalClient } from '../providers/animales/animal-client';
import { ReportClient } from '../providers/reportes/report-client';

import { Storage } from '@ionic/Storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AddFincasPage,
    FincaDetailsPage,
    TabsPage,
    AnimalsPage,
    ContactPage,
    InfoPage,
    AnimalDetailsPage,
    AddAnimalPage,
    AddReportsPage,
    FinanzasPage,
    ReportDetailPage,
    UserProfile
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
    AnimalsPage,
    ContactPage,
    InfoPage,
    AnimalDetailsPage,
    AddAnimalPage,
    AddReportsPage,
    FinanzasPage,
    ReportDetailPage,
    UserProfile
  ],
  providers: [
    Storage,
    FincaClient,
    UserClient,
    AnimalClient,
    ReportClient
  ]
})
export class AppModule { }
