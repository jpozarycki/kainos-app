import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoMonthsChartComponent } from './two-months-chart.component';

describe('TwoMonthsChartComponent', () => {
  let component: TwoMonthsChartComponent;
  let fixture: ComponentFixture<TwoMonthsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoMonthsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoMonthsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
