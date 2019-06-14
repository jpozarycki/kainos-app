import {Component, OnInit} from '@angular/core';
import {ExchangeRateService} from '../service/exchange-rate.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  currencies = [];
  currencyFrom;
  currencyTo;
  exchangeRate;

  constructor(private exchangeRateService: ExchangeRateService) {
  }

  ngOnInit() {
    this.getCurrencies();
  }

  getCurrencies() {
    this.exchangeRateService.getCurrencies().subscribe(data => {
      this.currencies = Object.keys(data);
      this.currencyFrom = this.currencies[this.getRandomIndex()];
      this.currencyTo = this.currencies[this.getRandomIndex()];
      this.getExchangeRate();
    });
  }

  getRandomIndex() {
    const min = 0;
    const max = this.currencies.length;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getExchangeRate() {
    this.exchangeRateService.getRealTimeRate(this.currencyFrom, this.currencyTo)
      .subscribe(result => {
        console.log(result),
          this.exchangeRate = 0,
          this.exchangeRate = result['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      });

  }

  switchCurrencies() {
    let temp;

    temp = this.currencyFrom;
    this.currencyFrom = this.currencyTo;
    this.currencyTo = temp;

    this.getExchangeRate();
  }


}

