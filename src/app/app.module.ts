import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { SideMenuComponent } from './components/side-menu/side-menu.component'
import firebase from 'firebase/app';
import { CreateAppointmentPipe } from './pages/create-appointment.pipe';
var firebaseConfig = {
  apiKey: "AIzaSyA51HcGHEw14qxREaM0k8-0eeXb4ToLQB4",
  authDomain: "clinic-manager-562b7.firebaseapp.com",
  projectId: "clinic-manager-562b7",
  storageBucket: "clinic-manager-562b7.appspot.com",
  messagingSenderId: "822238957812",
  appId: "1:822238957812:web:48ba422b7735ca98ae8ea1"
  };

firebase.initializeApp(environment.firebaseConfig);
@NgModule({
  declarations: [AppComponent,SideMenuComponent, CreateAppointmentPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule, ReactiveFormsModule ,CommonModule,AngularFireModule.initializeApp(environment.firebaseConfig),IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
