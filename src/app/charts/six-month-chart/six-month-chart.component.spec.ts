import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SixMonthChartComponent } from './six-month-chart.component';

describe('SixMonthChartComponent', () => {
  let component: SixMonthChartComponent;
  let fixture: ComponentFixture<SixMonthChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SixMonthChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SixMonthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
