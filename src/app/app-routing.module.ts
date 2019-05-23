import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './contact/contact.component';
import {CurrencyComponent} from './currency/currency.component';
import {ErrorComponent} from './error/error.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component: CurrencyComponent},
    {path: 'contact', component: ContactComponent},
    {path: '**', component: ErrorComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
