import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveYearsChartComponent } from './five-years-chart.component';

describe('FiveYearsChartComponent', () => {
  let component: FiveYearsChartComponent;
  let fixture: ComponentFixture<FiveYearsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveYearsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveYearsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
