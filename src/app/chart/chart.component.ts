import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {ExchangeRateService} from '../service/exchange-rate.service';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {

  @Input() currencyTo;
  @Input() currencyFrom;

  wasGenerated = false;
  private trendLineButtonText = 'Hide trendlines';
  private timeSeries = [];
  dates = new Array(8);
  trendLines = new Array(8);
  howManyButtons = 1;

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  constructor(private exchangeRateService: ExchangeRateService) {
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.wasGenerated = false;
    this.getExchangeRatesFromApi();
  }

  getExchangeRatesFromApi() {
    if (this.dates.length > 0) {
      this.dates.length = 0;
    }
    this.exchangeRateService.getHistoricalRate(this.currencyFrom, this.currencyTo)
      .subscribe(
        data => {
          // get needed data from API and save it as timeSeries
          this.timeSeries.length = 0;
          console.log(Object.keys(this.timeSeries).length);
          // tslint:disable-next-line:forin
          for (const item in data['Time Series FX (Daily)']) {
            this.timeSeries.unshift([item, parseFloat(data['Time Series FX (Daily)'][item]['4. close'])]);
          }
          console.log(this.timeSeries);
        }, err1 => {
        console.log(err1);
      }, () => {

        // create dataset of all dates between min and max with values/null
        const dataUpdated = new Array();
        const endDate = new Date(this.timeSeries[this.timeSeries.length - 1][0]);
        console.log('End date: ' + endDate);
        const tempDate = new Date(this.timeSeries[0][0]);
        console.log('Start date: ' + tempDate);
        while (tempDate <= endDate) {
          const dateToPut = this.refactorDate(tempDate);
          let exchangeValue;
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.timeSeries.length; i++) {
            if (this.timeSeries[i][0] === dateToPut) {
              exchangeValue = this.timeSeries[i][1];
            }
          }
          if (isNaN(exchangeValue)) {
            exchangeValue = null;
          }
          dataUpdated.push([dateToPut, exchangeValue]);
          tempDate.setDate(tempDate.getDate() + 1);
        }
        console.log(dataUpdated);
        // put dates and values together
        const tempDates = [new Array(7), new Array(30), new Array(60), new Array(180),
          new Array(365), new Array(730), new Array(1825), new Array(3650)];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < tempDates.length; i++) {
          for (let j = 0; j < tempDates[i].length; j++) {
            tempDates[i][tempDates[i].length - j - 1] = dataUpdated[dataUpdated.length - j - 1];
          }
        }
        console.log(tempDates);
        // dispose the undefined values
        for (let i = 0; i < tempDates.length; i++) {
          tempDates[i] = tempDates[i].filter(item => item !== undefined);
        }
        console.log(tempDates);
        this.dates = tempDates;
        console.log(this.dates);
        this.generateTrendLines();
        this.setHowManyButtons();
      });

  }

  refactorDate(date) {

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
    this.labels.length = 0;
    this.chartData[0].data.length = 0;
    switch (chosenRange) {
      case '1W':
        this.switchData(0);
        break;
      case '1M':
        this.switchData(1);
        break;
      case '2M':
        this.switchData(2);
        break;
      case '6M':
        this.switchData(3);
        break;
      case '1Y':
        this.switchData(4);
        break;
      case '2Y':
        this.switchData(5);
        break;
      case '5Y':
        this.switchData(6);
        break;
      case '10Y':
        this.switchData(7);
        break;
      default:
        this.switchData(0);
    }
    if (this.trendLineButtonText === 'Hide trendlines') {
      for (let i = 0; i < this.chartData.length; i++) {
        if (i > 0) {
          // @ts-ignore
          this.chartData[i].hidden = false;
        }
      }
    }
    this.wasGenerated = true;

  }

  switchData(index: number) {
    this.dates[index].forEach(data => {
      this.labels.push(data[0]);
      this.chartData[0].data.push(data[1]);
    });
    this.updateTrendLines(index);
  }

  generateTrendLines() {
    const numbersOfTrendlines = [1, 5, 5, 5, 5, 5, 5, 5];
    const trendlines = new Array(8);
    // create arrays for arrays
    for (let i = 0; i < trendlines.length; i++) {
      trendlines[i] = new Array(numbersOfTrendlines[i]);
    }
    // create arrays for values(X, Y) of trendlines
    for (let i = 0; i < trendlines.length; i++) {
      for (let j = 0; j < trendlines[i].length; j++) {
        const numberOfPoints = Math.trunc(this.dates[i].length / trendlines[i].length);
        trendlines[i][j] = new Array(numberOfPoints);
      }
    }
    console.log(trendlines);
    // fills all arrays with null
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < trendlines.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < trendlines[i].length; j++) {
        trendlines[i][j].fill(null);
      }
    }
    console.log(trendlines);
    // fills arrays of nulls with values at ends and beginnings of every range
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < trendlines.length; i++) {
        let n = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < trendlines[i].length; j++) {
          for (let k = 0; k < trendlines[i][j].length; k++) {
            if (k === 0 || k === trendlines[i][j].length - 1) {
              let c = this.dates[i].length - n - 1;
              while (this.dates[i][c][1] === null) {
                c++;
              }
              trendlines[i][j][trendlines[i][j].length - k - 1] = this.dates[i][c][1];

            }
            n++;
          }
        }
      }

    console.log(trendlines);
    // inserts nulls in front of trendline datasets - trendlines dont overlap
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < trendlines.length; i++) {
      for (let j = 0; j < trendlines[i].length; j++) {
        const tempRange = trendlines[i][j].length * (trendlines[i].length - j - 1);
        for (let k = 0; k < tempRange; k++) {
          trendlines[i][j].unshift(null);
        }
      }
    }
    console.log(trendlines);
    this.trendLines = trendlines;
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
        hidden: false
      };
      this.chartData.push(trendLine);
    }
    setTimeout(() => {
      this.chart.chart.update();
    });
  }



  setColor(trendLineValues: any[]): string {
    const trendLineValuesInNumbers = new Array();

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < trendLineValues.length; i++) {
      if (trendLineValues[i] !== null) {
        trendLineValuesInNumbers.push(trendLineValues[i]);
      }

    }

    const min = Math.min.apply(null, trendLineValuesInNumbers);
    const max = Math.max.apply(null, trendLineValuesInNumbers);
    console.log(min);
    console.log(max);
    if (trendLineValues.indexOf(max) < trendLineValues.indexOf(min)) {
      return '#ff5454';
    } else {
      return '#35ff82';
    }
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
      this.trendLineButtonText = 'Show trendlines';
    } else {
      this.trendLineButtonText = 'Hide trendlines';
    }

    this.chart.chart.update();
  }

  setHowManyButtons() {
    this.howManyButtons = 1;
    for ( let i = 1; i < this.dates.length; i++) {
      if (this.dates[i].length > this.dates[i - 1].length) {
        this.howManyButtons += 1;
      }
    }
  }

}
