import {LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptor/interceptor';
import { MenuComponent } from './menu/menu.component';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

import { registerLocaleData } from '@angular/common';


import localeEsAr from '@angular/common/locales/es-AR';



registerLocaleData(localeEsAr, 'es-Ar');

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
  ],
  providers: [
    Geolocation,
    NativeGeocoder, 
    SQLite,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'es-Ar' }
  ],
  exports:[MenuComponent],
  bootstrap: [AppComponent]
 
})
export class AppModule {}
