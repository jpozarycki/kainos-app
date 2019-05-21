import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {ErrorComponent} from './error/error.component';
import {ContactComponent} from './contact/contact.component';
import {FooterComponent} from './footer/footer.component';
import {ChartComponent} from './chart/chart.component';
import {CurrencyComponent} from './currency/currency.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiService} from './service/api.service';
import {TenYearsChartComponent} from './charts/ten-years-chart/ten-years-chart.component';
import {FiveYearsChartComponent} from './charts/five-years-chart/five-years-chart.component';
import {TwoYearsChartComponent} from './charts/two-years-chart/two-years-chart.component';
import {YearChartComponent} from './charts/year-chart/year-chart.component';
import {SixMonthChartComponent} from './charts/six-month-chart/six-month-chart.component';
import {TwoMonthsChartComponent} from './charts/two-months-chart/two-months-chart.component';
import {MonthChartComponent} from './charts/month-chart/month-chart.component';
import {WeekChartComponent} from './charts/week-chart/week-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyComponent,
    ChartComponent,
    FooterComponent,
    ContactComponent,
    ErrorComponent,
    DropdownDirective,
    WeekChartComponent,
    MonthChartComponent,
    TwoMonthsChartComponent,
    SixMonthChartComponent,
    YearChartComponent,
    TwoYearsChartComponent,
    FiveYearsChartComponent,
    TenYearsChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
