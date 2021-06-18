import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CityComponent} from './city.component';
import {OpenWeatherService} from "../../services/open-weather.service";
import {City} from "../../models/city.model";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {Observable, of} from "rxjs";

describe('CityComponent', () => {
  let component: CityComponent;
  let openWeatherService: OpenWeatherService;
  let fixture: ComponentFixture<CityComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ CityComponent ]
  //   })
  //   .compileComponents();
  // });
  //
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(CityComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      providers: [
        CityComponent,
        {provide: OpenWeatherService, useClass: MockWeatherService}
      ]
    });
    // inject both the component and the dependent service.
    component = TestBed.inject(CityComponent);
    openWeatherService = TestBed.inject(OpenWeatherService);
  });

  it('should showComponent false', () => {
    expect(component.showComponent).toBe(false);
  });

  it('should showDetail false', () => {
    expect(component.showDetail).toBe(false);
  });

  it('should set some variables after Angular calls ngOnInit', () => {
    component.city = {name: 'Amsterdam', lat: '52.377956', lon: 4.897070};

    component.ngOnInit();
    expect(component.currentTemp).not.toEqual(undefined);
    expect(component.currentWindSpeed).not.toEqual(undefined);
    expect(component.weatherState).not.toEqual(undefined);
    expect(component.showComponent).toBe(true);
  });
});

class MockWeatherService {
  isLoggedIn = true;

  getOneCall(params: any): Observable<any> {
    params = {lat: 1, lon: 1};
    let city1 = new City();
    city1 = {
      lat: 1, lon: 1,
      current: {
        dt: 1623927247, temp: 27.6, feels_like: 28.78, wind_speed: 0.45,
        weather: [{
          description: "clear sky",
          icon: "01d",
          id: 800,
          main: "Clear",
        }]
      },
      hourly: [{dt: 1623924000, weather: [{id: 500, main: "Rain", description: "light rain", icon: "10d"}]},
        {dt: 1623924000, weather: [{id: 500, main: "Rain", description: "light rain", icon: "10d"}]},
        {dt: 1623924000, weather: [{id: 500, main: "Rain", description: "light rain", icon: "10d"}]}]
    }

    return of(city1);
  }


}
