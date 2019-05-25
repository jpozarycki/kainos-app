import {BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiService} from './service/api.service';
import {ChartsModule} from 'ng2-charts';
import {AppModule} from './app.module';

@NgModule({
  imports: [
    
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    AppModule,
    BrowserTransferStateModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
