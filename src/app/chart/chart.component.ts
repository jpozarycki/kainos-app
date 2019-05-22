import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../service/api.service';
import {BaseChartDirective} from 'ng2-charts';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {

  @Input() currencyTo;
  @Input() currencyFrom;
  private exchangeRateValues = [];
  private timeSeries = [];
  private totalRange = [];
  private dates = [new Array(7), new Array(30), new Array(60), new Array(180),
    new Array(365), new Array(730), new Array(1825), new Array(3650)];
  private trendLines = new Array(this.dates.length);
  private exchangeRateValuesForChart =
    [new Array(7), new Array(30), new Array(60), new Array(180),
    new Array(365), new Array(730), new Array(1825), new Array(3650)];

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  constructor(private apiService: ApiService) {
  }

  chartOptions = {
    responsive: true,
    spanGaps: true,
    elements: {
      point: {
        radius: 0
      },
    },
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false
        },
        ticks: {
          maxTicksLimit: 25,
          autoSkip: true,
          fontFamily: 'Montserrat',
        }
      }],
      yAxes: [{
        gridLines: {
          drawOnChartArea: false
        },
        ticks: {
          fontFamily: 'Montserrat'
        }
      }]
    }
  };

  labels = [];

  chartData = [
    {
      label: 'Exchange rate',
      data: [],
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
    this.getExchangeRatesFromApi();

  }

  ngAfterViewInit() {
    this.updateChartData('');
  }

  getExchangeRatesFromApi() {
    this.apiService.getHistoricalRate(this.currencyFrom, this.currencyTo)
      .pipe(map(
        data => {
          this.timeSeries = data['Time Series FX (Daily)'];
          console.log(this.timeSeries);
          this.totalRange.forEach(date => {
            const item = ((this.timeSeries[date] || {})['4. close'] || null);
            this.exchangeRateValues.push(item);
          });
        }))
      .subscribe(() => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.exchangeRateValuesForChart.length; i++) {
          for (let j = 0; j < this.exchangeRateValuesForChart[i].length; j++) {
            this.exchangeRateValuesForChart[i][this.exchangeRateValuesForChart[i].length - j] =
              this.exchangeRateValues[this.exchangeRateValues.length - j - 1];
          }
        }
        this.chart.chart.update();
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

    this.totalRange = this.totalRange.reverse();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.dates.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.dates[i].length; j++) {
        this.dates[i][this.dates[i].length - j - 1] = this.totalRange[this.totalRange.length - j - 1];
      }
    }

    console.log(this.dates);
    console.log(this.totalRange);


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
        this.chartData[0].data = this.exchangeRateValuesForChart[0];
        break;
      case '1M':
        this.labels = this.dates[1];
        this.chartData[0].data = this.exchangeRateValuesForChart[1];
        break;
      case '2M':
        this.labels = this.dates[2];
        this.chartData[0].data = this.exchangeRateValuesForChart[2];
        break;
      case '6M':
        this.labels = this.dates[3];
        this.chartData[0].data = this.exchangeRateValuesForChart[3];
        break;
      case '1Y':
        this.labels = this.dates[4];
        this.chartData[0].data = this.exchangeRateValuesForChart[4];
        break;
      case '2Y':
        this.labels = this.dates[5];
        this.chartData[0].data = this.exchangeRateValuesForChart[5];
        break;
      case '5Y':
        this.labels = this.dates[6];
        this.chartData[0].data = this.exchangeRateValuesForChart[6];
        break;
      case '10Y':
        this.labels = this.dates[7];
        this.chartData[0].data = this.exchangeRateValuesForChart[7];
        break;
      default:
        this.labels = this.dates[0];
        this.chartData[0].data = this.exchangeRateValuesForChart[0];
    }
    console.log(this.labels);
  }

  generateTrendLines() {

    const trendLine = {
      label: 'Trendline',
      data: new Array(),
      borderColor: '',
      borderWidth: 1,
      borderDash: [10, 5],
      fill: false,
      hidden: false
    };

    const numbersOfTrendlines = [1, 2, 3, 4, 5, 5, 5, 5];
    for (let i = 0; i < this.trendLines.length; i++) {
      this.trendLines[i] = new Array(numbersOfTrendlines[i]);
    }

    for (let i = 0; i < this.trendLines.length; i++) {
      for (let j = 0; j < this.trendLines[i].length; j++) {
        console.log(this.dates[i].length);
        const numberOfPoints = this.dates[i].length / this.trendLines[i].length;
        console.log(numberOfPoints);
        this.trendLines[i][j] = new Array(numberOfPoints);
      }
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.trendLines.length; i++) {
      for (let j = 0; j < this.trendLines[i].length; j++) {
        for (let k = 0; k < this.trendLines[i][j].length; k++) {
          this.trendLines[i][j][k] = null;
        }
      }
    }

    for (let i = 0; i < this.trendLines.length; i++) {
      let n = 0;
      for (let j = 0; j < this.trendLines[i].length; j++) {
        for (let k = 0; k < this.trendLines[i][j].length; k++) {
          if (k === 0 || k === (this.trendLines[i][j].length - 1)) {
            if ( this.exchangeRateValues[n] !== null) {
              this.trendLines[i][j][k] = this.exchangeRateValues[n];
            } else {
              let c = n;
              while (this.exchangeRateValues[c] === null) {
                c--;
              }
              this.trendLines[i][j][k] = this.exchangeRateValues[c];
            }

          }
          n++;
        }
      }
    }

    console.log(this.exchangeRateValues);
    console.log(this.trendLines);


    // for (let i = 0; i < trendLine.data.length; i++) {
    //   if (i === 0 || i === trendLine.data.length - 1) {
    //     trendLine.data[i] = (this.exchangeRateValues[i]);
    //   } else {
    //     trendLine.data[i] = null;
    //   }
    //
    // }


    this.chart.datasets.push(trendLine);
    // this.chartData[1] = trendLine;
    if (trendLine.data[0] < trendLine.data[trendLine.data.length - 1]) {
      trendLine.borderColor = '#f4427a';
    }
  }


  hideTrendLine() {
    // @ts-ignore
    this.chartData[1].hidden = !this.chartData[1].hidden;
    this.chart.chart.update();
  }


}
