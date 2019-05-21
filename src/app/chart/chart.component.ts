import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../service/api.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {

  @Input() currencyTo;
  @Input() currencyFrom;
  private dateRange = new Array();
  private exchangeRateValues = new Array();
  private timeSeries;
  timestamps: string[] = ['1W', '1M', '1Y', '2Y', '5Y', '10Y'];
  chosenTimeRange: any;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getExchangeRatesFromApi();
  }

  getExchangeRatesFromApi() {
    this.apiService.getHistoricalRate(this.currencyFrom, this.currencyTo)
      .subscribe(data => {
        this.timeSeries = data['Time Series FX (Daily)'];
        console.log('Response: ' + this.timeSeries);
      });

  }
  exchangeRatesToArray() {
    if (this.exchangeRateValues.length > 0) { this.exchangeRateValues.length = 0; }
    this.dateRange.forEach(date => {
      const item = (((this.timeSeries || '0')[date] || '0')['4. close'] || '0');
      this.exchangeRateValues.push(item);
    });
    console.log('Exchange Rate Values: ' + this.exchangeRateValues);
  }

  setDateRange() {
    const endDate = new Date();
    const startDate = new Date();
    switch (this.chosenTimeRange) {
      case '1W':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '1M':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case '1Y':
        startDate.setDate(endDate.getDate() - 365);
        break;
      case '2Y':
        startDate.setDate(endDate.getDate() - 730);
        break;
      case '5Y':
        startDate.setDate(endDate.getDate() - 1825);
        break;
      case '10Y':
        startDate.setDate(endDate.getDate() - 2650);
        break;
    }
    console.log('Start date: ' + startDate);
    while (startDate <= endDate) {
      this.dateRange.push(this.refactorDate(new Date(startDate)));
      startDate.setDate(startDate.getDate() + 1);
    }
    console.log('Date range: ' + this.dateRange);
  }

  private refactorDate(date) {

    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    date = yyyy + '-' + mm + '-' + dd;

    return date;
  }
}
