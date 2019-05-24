import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HeaderComponent} from './header/header.component';

describe('AppComponent', () => {

  let fixtureHeader: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixtureHeader = TestBed.createComponent(HeaderComponent);
    router = TestBed.get(Router);

  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should navigate to contact', () => {
    const component = fixtureHeader.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');

    component.goContact();
    expect(navigateSpy).toHaveBeenCalledWith(['contact']);
  });

  it('should navigate to home', () => {
    const component = fixtureHeader.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');

    component.goHome();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });
});
