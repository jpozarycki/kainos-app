import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChartComponent} from './chart.component';
import {ChartsModule} from 'ng2-charts';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ChartTestComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent ],
      imports: [ ChartsModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
