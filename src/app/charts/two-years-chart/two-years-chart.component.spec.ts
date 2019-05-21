import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoYearsChartComponent } from './two-years-chart.component';

describe('TwoYearsChartComponent', () => {
  let component: TwoYearsChartComponent;
  let fixture: ComponentFixture<TwoYearsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoYearsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoYearsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
