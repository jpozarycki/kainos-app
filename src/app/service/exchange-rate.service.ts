import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

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
     return this.http.get(this.API_REAL_TIME_URL + currencyFrom + '&to_currency=' + currencyTo + '&apikey=B19MFIHYQ01VRIIU');
  }

  getHistoricalRate(currencyFrom: string, currencyTo: string) {
    return this.http.get(
       this.API_HISTORICAL_URL + currencyFrom + '&to_symbol=' + currencyTo + '&outputsize=full&apikey=B19MFIHYQ01VRIIU');
  }
}
