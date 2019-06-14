import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChartComponent} from './chart.component';
import {ChartsModule} from 'ng2-charts';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {SimpleChange} from '@angular/core';
import {ExchangeRateService} from '../service/exchange-rate.service';

describe('ChartTestComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let currencyFrom;
  let apiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent ],
      imports: [ ChartsModule, HttpClientTestingModule, FormsModule ],
      providers: [ExchangeRateService]
    })
    .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    apiService = TestBed.get(ExchangeRateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    currencyFrom = 'AAA';
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect change', () => {
    const currencyFromAfterChange = 'BBB';
    spyOn(component, 'ngOnChanges').and.callThrough();
    spyOn(component, 'getExchangeRatesFromApi').and.callThrough();
    component.wasGenerated = true;
    component.ngOnChanges({prop1:
      new SimpleChange(currencyFrom, currencyFromAfterChange, true)
    });
    fixture.detectChanges();
    expect(component.ngOnChanges).toHaveBeenCalled();
    expect(component.getExchangeRatesFromApi).toHaveBeenCalled();
    expect(component.wasGenerated).toEqual(false);
  });

  it('should refactor date', () => {
    const date = new Date();
    spyOn(component, 'refactorDate').and.callThrough();

    const refactoredDate = component.refactorDate(date);
    expect(component.refactorDate).toHaveBeenCalled();
    expect(new Date(refactoredDate).getDate).toEqual(new Date().getDate);
    expect(new Date(refactoredDate).getMonth).toEqual(new Date().getMonth);
    expect(new Date(refactoredDate).getFullYear).toEqual(new Date().getFullYear);
  });

  it('should get exchange rates from api', () => {
    spyOn(component, 'getExchangeRatesFromApi').and.callThrough();

    component.getExchangeRatesFromApi();
    expect(component.getExchangeRatesFromApi).toHaveBeenCalledTimes(1);

  });

  // it('should update trendlines', () => {
  //   spyOn(component, 'updateTrendLines').and.callThrough();
  //
  //   component.chartData = [{
  //     label: 'ABC',
  //     data: []
  //   }];
  //   component.trendLines = [[['1']], [['1']], [['1']], [['1']], [['1']], [['1']], [['1']], [['1']]];
  //
  //   component.updateTrendLines(0);
  //   expect(component.updateTrendLines).toHaveBeenCalledTimes(1);
  // });

  // it('should update chart data', () => {
  //   spyOn(component, 'updateChartData').and.callThrough();
  //   component.dates = [[['1']], [['1']], [['1']], [['1']], [['1']], [['1']], [['1']], [['1']]];
  //   component.trendLines = [[['1']], [['1']], [['1']], [['1']], [['1']], [['1']], [['1']], [['1']]];
  //   component.chartData[0].data = [];
  //   component.updateChartData('1M');
  //   expect(component.updateChartData).toHaveBeenCalledTimes(1);
  //   expect(component.chartData[0].data.length).toBeGreaterThan(0);
  //   expect(component.labels.length).toBeGreaterThan(0);
  // });

  // it('should hide trendlines', () => {
  //   spyOn(component, 'hideTrendLine').and.callThrough();
  //   const testTrendline = {
  //     label: 'Test',
  //     data: [],
  //     hidden: true
  //   };
  //   component.chartData.push(testTrendline);
  //
  //   component.hideTrendLine();
  //
  //   expect(component.hideTrendLine).toHaveBeenCalledTimes(1);
  // });

  it('should generate trendlines', () => {
    component.dates = [[['1']], [['1']], [['1']], [['1']], [['1']], [['1']], [['1']], [['1']]];
    spyOn(component, 'generateTrendLines').and.callThrough();

    component.generateTrendLines();

    expect(component.generateTrendLines).toHaveBeenCalledTimes(1);
  });

  it('should set color', () => {
    spyOn(component, 'setColor').and.callThrough();
    const testTrendLine = [0, 1];

    const color = component.setColor(testTrendLine);

    expect(component.setColor).toHaveBeenCalledTimes(1);
    expect(color).toEqual('#35ff82');
  });

  it('should set how many buttons are available', () => {
    spyOn(component, 'setHowManyButtons').and.callThrough();
    component.dates = [[['1']], [['1'], ['1']], [['1'], ['1'], ['1']], [['1']], [['1']], [['1']], [['1']], [['1']]];

    component.setHowManyButtons();
    expect(component.setHowManyButtons).toHaveBeenCalledTimes(1);
    expect(component.howManyButtons).toEqual(3);
  });
});
