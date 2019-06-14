import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  public currencyFrom = new BehaviorSubject<string>('');
  public currencyTo = new BehaviorSubject<string>('');

  private API_CURRENCIES_URL = 'https://openexchangerates.org/api/currencies.json';

  private API_REAL_TIME_URL =
    'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=';
  private API_HISTORICAL_URL =
    'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=';

  constructor(private http: HttpClient) {
  }

  getCurrencies() {
    return this.http.get(this.API_CURRENCIES_URL);
  }

  getRealTimeRate(currencyFrom: string, currencyTo: string) {
    this.currencyFrom.next(currencyFrom);
    this.currencyTo.next(currencyTo);
    console.log(this.currencyFrom.value);
    console.log(this.currencyTo.value);
    return this.http.get(this.API_REAL_TIME_URL + this.currencyFrom.value + '&to_currency=' + this.currencyTo.value + '&apikey=B19MFIHYQ01VRIIU');
  }

  getHistoricalRate() {
    return this.http.get(
      this.API_HISTORICAL_URL + this.currencyFrom.value + '&to_symbol=' + this.currencyTo.value + '&outputsize=full&apikey=B19MFIHYQ01VRIIU');
  }
}
