import {Component, OnInit} from '@angular/core';
import {ApiService} from '../service/api.service';
import {map} from 'rxjs/operators';

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

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getCurrencies();
  }

  getCurrencies() {
    this.apiService.getCurrencies().subscribe(data => {
      this.currencies = Object.keys(data);
      this.currencyFrom = 'PLN';
      this.currencyTo = 'CHF';
      this.getExchangeRate();
    });
  }

  getExchangeRate() {
    this.apiService.getRealTimeRate(this.currencyFrom, this.currencyTo)
      .pipe(map(result => {
        console.log(result),
          this.exchangeRate = 0,
          this.exchangeRate = result['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      })).subscribe();

  }

  switchCurrencies() {
    let temp;

    temp = this.currencyFrom;
    this.currencyFrom = this.currencyTo;
    this.currencyTo = temp;

    this.getExchangeRate();
  }


}

