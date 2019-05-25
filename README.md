# Kainos Exchange Rate Challenge

App shows real-time exchange rate for a chosen pair of currencies and historical data in form of a graph. You can choose which range should be shown (min 7 days, max 10 years), of course if data is available on the server. For every range trendlines are generated - for increasing values, they are green and for decreasing values they are red. You can toggle the visibility of trendlines.
![api ss](https://github.com/jpozarycki/kainos-app/blob/master/src/app-screenshot.png)
## APIs

List of currencies is provided by [openexchangerates.org](https://openexchangerates.org/api/currencies.json).
Real-time values are provided by [alhavantage.co](https://www.alphavantage.co/documentation/#currency-exchange).
Historical data are provided by [alphavantage.co](https://www.alphavantage.co/documentation/#fx-daily).

## Tools

The app was written using [Angular 7](https://angular.io/) (TypeScript 3.2.4). For styling [Bootstrap 4](https://v4-alpha.getbootstrap.com/) and CSS 3 was chosen. Charts are generated with [Chart.js](https://www.chartjs.org/) and [ng2-charts](https://valor-software.com/ng2-charts/). Unit tests were written using [Jasmine](https://jasmine.github.io/)/[Karma](https://karma-runner.github.io/4.0/index.html) environment.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Warnings

Free alphavantage key lets the user to make only 5 calls per minute and 500 per day. Jasmine has issues with testing Chart.js and therefore tests for methods using chart values are available, but commented out.
