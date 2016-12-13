import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

  export const firebaseConfig = {
    apiKey: "AIzaSyCbcMSZ3SkBs4z3CCafEpl6QMdf4-LKS9w",
    authDomain: "pepper-808dc.firebaseapp.com",
    databaseURL: "https://pepper-808dc.firebaseio.com",
    storageBucket: "pepper-808dc.appspot.com",
    messagingSenderId: "1063648750448"
  }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
