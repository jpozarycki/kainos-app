import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenYearsChartComponent } from './ten-years-chart.component';

describe('TenYearsChartComponent', () => {
  let component: TenYearsChartComponent;
  let fixture: ComponentFixture<TenYearsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenYearsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenYearsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
