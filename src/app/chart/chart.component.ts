import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ApiService} from '../service/api.service';
import {BaseChartDirective} from 'ng2-charts';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() currencyTo;
  @Input() currencyFrom;
  trendlineText = 'Hide trendlines';
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
    animation: false,
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
  wasGenerated = false;


  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.getExchangeRatesFromApi();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.wasGenerated = false;
    this.getExchangeRatesFromApi();
  }

  getExchangeRatesFromApi() {
    if (this.exchangeRateValues.length > 0) {
      this.exchangeRateValues.length = 0;
    }
    this.apiService.getHistoricalRate(this.currencyFrom, this.currencyTo)
      .pipe(map(
        data => {
          this.timeSeries.length = 0;
          console.log(Object.keys(this.timeSeries).length);
          // tslint:disable-next-line:forin
          for (const item in data['Time Series FX (Daily)']) {
            this.timeSeries.unshift([item, parseFloat(data['Time Series FX (Daily)'][item]['4. close'])]);
          }
          console.log(this.timeSeries);
        }))
      .subscribe(() => {
        this.labels.length = 0;
        this.chartData[0].data.length = 0;
        for (let i = 0; i < this.timeSeries.length; i++) {
          this.labels.push(this.timeSeries[i][0]);
          this.chartData[0].data.push(this.timeSeries[i][1]);
        }
        console.log(this.labels);
        console.log(this.chartData[0].data);
        });

  }

  populateDates() {
    const dates = new Array();
    const endDate = new Date(this.timeSeries[this.timeSeries.length - 1][0]);
    console.log('End date: ' + endDate);
    const tempDate = new Date(this.timeSeries[0][0]);
    console.log('Start date: ' + tempDate);
    while (tempDate <= endDate) {
      const dateToPut = this.refactorDate(tempDate);
      let exchangeValue;
      for (let i = 0; i < this.timeSeries.length; i++) {
        if (this.timeSeries[i][0] === dateToPut) {
          exchangeValue = this.timeSeries[i][1];
        }
      }
      if (isNaN(exchangeValue)) {
        exchangeValue = null;
      }
      dates.push( [dateToPut, exchangeValue]);
      tempDate.setDate(tempDate.getDate() + 1);
    }
    console.log(dates);
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

    switch (chosenRange) {
      case '1W':
        this.labels = this.dates[0];
        this.chartData[0].data = this.exchangeRateValuesForChart[0];
        this.updateTrendLines(0);
        break;
      case '1M':
        this.labels = this.dates[1];
        this.chartData[0].data = this.exchangeRateValuesForChart[1];
        this.updateTrendLines(1);
        break;
      case '2M':
        this.labels = this.dates[2];
        this.chartData[0].data = this.exchangeRateValuesForChart[2];
        this.updateTrendLines(2);
        break;
      case '6M':
        this.labels = this.dates[3];
        this.chartData[0].data = this.exchangeRateValuesForChart[3];
        this.updateTrendLines(3);
        break;
      case '1Y':
        this.labels = this.dates[4];
        this.chartData[0].data = this.exchangeRateValuesForChart[4];
        this.updateTrendLines(4);
        break;
      case '2Y':
        this.labels = this.dates[5];
        this.chartData[0].data = this.exchangeRateValuesForChart[5];
        this.updateTrendLines(5);
        break;
      case '5Y':
        this.labels = this.dates[6];
        this.chartData[0].data = this.exchangeRateValuesForChart[6];
        this.updateTrendLines(6);
        break;
      case '10Y':
        this.labels = this.dates[7];
        this.chartData[0].data = this.exchangeRateValuesForChart[7];
        this.updateTrendLines(7);
        break;
      default:
        this.labels = this.dates[0];
        this.chartData[0].data = this.exchangeRateValuesForChart[0];
        this.updateTrendLines(0);
    }
    if (this.trendlineText === 'Hide trendlines') {
      for (let i = 0; i < this.chartData.length; i++) {
        if (i > 0) {
          // @ts-ignore
          this.chartData[i].hidden = false;
        }
      }
    }
    this.wasGenerated = true;

  }

  updateTrendLines(chosenRange: number) {
    console.log(this.chartData);
    while (this.chartData.length > 1) {
      this.chartData.pop();
    }
    console.log(this.chartData);
    console.log(this.trendLines[chosenRange]);

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.trendLines[chosenRange].length; i++) {
      const trendLine = {
        label: 'Trendline',
        data: this.trendLines[chosenRange][i],
        borderColor: this.setColor(this.trendLines[chosenRange][i]),
        borderWidth: 1,
        borderDash: [10, 5],
        fill: false,
        hidden: true
      };
      this.chartData.push(trendLine);
    }
    setTimeout(() => {
      this.chart.chart.update();
    });
  }

  private setColor(trendLineValues: any[]): string {
    const trendLineValuesInNumbers = new Array();

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < trendLineValues.length; i++) {
      if (trendLineValues[i] !== null) {
        trendLineValuesInNumbers.push(trendLineValues[i]);
      }

    }

    const min = Math.min.apply(null, trendLineValuesInNumbers);
    const max = Math.max.apply(null, trendLineValuesInNumbers);

    if (trendLineValues.indexOf(max.toString()) < trendLineValues.indexOf(min.toString())) {
      return '#ff5454';
    } else {
      return '#35ff82';
    }
  }

  generateTrendLines() {

    const numbersOfTrendlines = [1, 2, 3, 4, 5, 5, 5, 5];
    for (let i = 0; i < this.trendLines.length; i++) {
      this.trendLines[i] = new Array(numbersOfTrendlines[i]);
    }

    for (let i = 0; i < this.trendLines.length; i++) {
      for (let j = 0; j < this.trendLines[i].length; j++) {
        const numberOfPoints = this.dates[i].length / this.trendLines[i].length;
        this.trendLines[i][j] = new Array(numberOfPoints);
      }
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.trendLines.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.trendLines[i].length; j++) {
        this.trendLines[i][j].fill(null);
      }
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.trendLines.length; i++) {
      let n = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.trendLines[i].length; j++) {
        for (let k = 0; k < this.trendLines[i][j].length; k++) {
          if (k === 0 || k === this.trendLines[i][j].length - 1) {
            let c = this.exchangeRateValuesForChart[i].length - n - 1;
            while (this.exchangeRateValuesForChart[i][c] === null) {
              c++;
            }
            this.trendLines[i][j][this.trendLines[i][j].length - k - 1]
              = this.exchangeRateValuesForChart[i][c];
          }
          n++;
        }
      }
    }

    const trendLinesTemp = new Array();
    // tslint:disable-next-line:prefer-for-of
    for (let h = 0; h < this.trendLines.length; h++) {
      const trendLinesTempInLoop = this.trendLines[h];
      for (let i = 0; i < trendLinesTempInLoop.length; i++) {
        const tempRange = trendLinesTempInLoop[i].length * (trendLinesTempInLoop.length - i - 1);
        for (let j = 0; j < tempRange; j++) {
          trendLinesTempInLoop[i].unshift(null);
        }
      }
      trendLinesTemp.push(trendLinesTempInLoop);
    }
    this.trendLines = trendLinesTemp;
    console.log(this.trendLines);

  }


  hideTrendLine() {
    // @ts-ignore
    for (let i = 0; i < this.chartData.length; i++) {
      if (i > 0) {
        // @ts-ignore
        this.chartData[i].hidden = !this.chartData[i].hidden;
      }
    }
    // @ts-ignore
    if (this.chartData[this.chartData.length - 1].hidden === true) {
      this.trendlineText = 'Show trendlines';
    } else {
      this.trendlineText = 'Hide trendlines';
    }

    this.chart.chart.update();
  }


}
