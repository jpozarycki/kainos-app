import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CurrencyComponent} from './currency.component';
import {FormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApiService} from '../service/api.service';

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;
  let currencyFromMock;
  let currencyToMock;
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyComponent ],
      imports: [FormsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ ApiService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.get(ApiService);
    currencyFromMock = 'PLN';
    currencyToMock = 'CHF';
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get currencies', async () => {
    const apiServiceSpy = spyOn(apiService, 'getCurrencies').and.callThrough();
    const componentSpy = spyOn(component, 'getCurrencies').and.callThrough();

    component.getCurrencies();

    expect(apiServiceSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledTimes(1);
  });

  it('should get exchange rates', async () => {
    const apiServiceSpy = spyOn(apiService, 'getRealTimeRate').and.callThrough();
    const componentSpy = spyOn(component, 'getExchangeRate').and.callThrough();

    component.getExchangeRate();

    expect(apiServiceSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledTimes(1);
  });

  it('should switch currency values', async () => {
    let currencyFromAfterSwitch = currencyFromMock;
    let currencyToAfterSwitch = currencyToMock;
    const componentSpy = spyOn(component, 'switchCurrencies').and.callFake(() => {
      currencyFromAfterSwitch = currencyToMock;
      currencyToAfterSwitch = currencyFromMock;
    });

    component.switchCurrencies();

    expect(componentSpy).toHaveBeenCalledTimes(1);
    expect(currencyToAfterSwitch).toEqual(currencyFromMock);
    expect(currencyFromAfterSwitch).toEqual(currencyToMock);
  });
});
