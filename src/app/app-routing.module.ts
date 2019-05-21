import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactComponent} from './contact/contact.component';
import {CurrencyComponent} from './currency/currency.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component: CurrencyComponent},
    {path: 'contact', component: ContactComponent},
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
