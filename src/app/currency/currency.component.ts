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
      this.currencyFrom = 'PLN';
      this.currencyTo = 'CHF';
      this.getExchangeRate();
    });
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

