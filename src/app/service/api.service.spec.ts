import {getTestBed, TestBed} from '@angular/core/testing';

import {ApiService} from './api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {take} from 'rxjs/operators';

describe('ApiService Tests', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: ApiService;
  let currDefault;
  let realtimeDefault;
  let historicalDefault;
  let currencyFromMock;
  let currencyToMock;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    injector = getTestBed();
    service = injector.get(ApiService);
    httpMock = injector.get(HttpTestingController);

    currDefault = {AED: 'United Arab Emirates Dirham'};
    realtimeDefault = {
      'Realtime Currency Exchange Rate': {}
    };

    historicalDefault = { 'Meta Data' : {}, 'Time Series FX (Daily)' : {}};
    currencyFromMock = 'PLN';
    currencyToMock = 'CHF';
  });
  //
  describe('Service methods', async () => {
      it('should be created', () => {
        expect(service).toBeTruthy();
      });

      it('Should get currencies', async () => {
      const returnedFromService = Object.assign({}, currDefault);
      service
        .getCurrencies()
        .pipe(take(1))
        .subscribe(response => expect(response).toEqual(jasmine.objectContaining(currDefault)));

      const request = httpMock.expectOne({method: 'GET'});
      request.flush(returnedFromService);
    });

      it('Should get realtime data', async () => {
      const returnedFromService = Object.assign({}, realtimeDefault);
      service
        .getRealTimeRate(currencyFromMock, currencyToMock)
        .pipe(take(1))
        .subscribe(response => expect(Object.keys(response)).toEqual(Object.keys(realtimeDefault)));

      const request = httpMock.expectOne({method: 'GET'});
      request.flush(returnedFromService);
    });

      it('Should get historical data', async () => {
      const returnedFromService = Object.assign({}, historicalDefault);
      service
        .getHistoricalRate(currencyFromMock, currencyToMock)
        .pipe(take(1))
        .subscribe(response => expect(Object.keys(response)).toEqual(Object.keys(historicalDefault)));

      const request = httpMock.expectOne({method: 'GET'});
      request.flush(returnedFromService);
    });
  });
});

