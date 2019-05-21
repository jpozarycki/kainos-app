import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TenYearsChartComponent} from './charts/ten-years-chart/ten-years-chart.component';
import {FiveYearsChartComponent} from './charts/five-years-chart/five-years-chart.component';
import {TwoYearsChartComponent} from './charts/two-years-chart/two-years-chart.component';
import {YearChartComponent} from './charts/year-chart/year-chart.component';
import {SixMonthChartComponent} from './charts/six-month-chart/six-month-chart.component';
import {TwoMonthsChartComponent} from './charts/two-months-chart/two-months-chart.component';
import {MonthChartComponent} from './charts/month-chart/month-chart.component';
import {WeekChartComponent} from './charts/week-chart/week-chart.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '1W', component: WeekChartComponent},
    {path: '1M', component: MonthChartComponent},
    {path: '2M', component: TwoMonthsChartComponent},
    {path: '6M', component: SixMonthChartComponent},
    {path: '1Y', component: YearChartComponent},
    {path: '2Y', component: TwoYearsChartComponent},
    {path: '5Y', component: FiveYearsChartComponent},
    {path: '10Y', component: TenYearsChartComponent}])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
