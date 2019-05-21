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
  private dateRange = ['2019-05-21', '2019-05-20', '2019-05-19', '2019-05-18', '2019-05-17', '2019-05-16', '2019-05-15'];
  private exchangeRateValues = [];
  private timeSeries = [];
  private totalRange = [];
  private dates = [new Array(7), new Array(30), new Array(60), new Array(180),
    new Array(365), new Array(730), new Array(1825), new Array(3650)];

  constructor(private apiService: ApiService) { }

  chartOptions = {
    responsive: true,
    elements: {
      point: {
        radius: 0
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false
        },
        ticks: {
          maxTicksLimit: 25,
          autoSkip: true
        }
      }],
      yAxes: [{
        gridLines: {
          drawOnChartArea: false
        }
      }]
    }
  };

  labels = [];

  chartData = [
    {
      label: 'Exchange rate',
      data: []
    }

  ];

  colors = [
    {
      borderColor: '#77b6ff',
      fill: false,
      borderWidth: 2
    }
  ];


  ngOnInit() {
    this.populateDates();
    this.labels = this.dates[0];
  }

  ngAfterViewInit() {
    this.getExchangeRatesFromApi();
  }

  getExchangeRatesFromApi() {
    this.apiService.getHistoricalRate(this.currencyFrom, this.currencyTo)
      .subscribe(data => {
        this.timeSeries = data['Time Series FX (Daily)'];
        console.log(this.timeSeries);
        this.totalRange.forEach( date => {
          const itemBefore = this.exchangeRateValues[this.exchangeRateValues.length - 1];
          const item = ((this.timeSeries[date] || '')['4. close'] || itemBefore);
          this.exchangeRateValues.push(item);
        });
        console.log(this.exchangeRateValues);
        this.chartData[0].data = this.exchangeRateValues;
      });

  }

  populateDates() {
    const endDate = new Date();

    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 3650);

    while (endDate >= startDate) {
      this.totalRange.push(this.refactorDate(endDate));
      endDate.setDate(endDate.getDate() - 1);
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.dates.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.dates[i].length; j++) {
        this.dates[i][j] = this.totalRange[j];
      }
    }

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

  updateChartData(chosenRange: string) {
    console.log('It works');
    console.log(chosenRange);

    switch (chosenRange) {
      case '1W':
        this.labels = this.dates[0];
        break;
      case '1M':
        this.labels = this.dates[1];
        break;
      case '2M':
        this.labels = this.dates[2];
        break;
      case '6M':
        this.labels = this.dates[3];
        break;
      case '1Y':
        this.labels = this.dates[4];
        break;
      case '2Y':
        this.labels = this.dates[5];
        break;
      case '5Y':
        this.labels = this.dates[6];
        break;
      case '10Y':
        this.labels = this.dates[7];
        break;
      default:
        this.labels = this.dates[0];
    }
    console.log(this.labels);
  }
}
