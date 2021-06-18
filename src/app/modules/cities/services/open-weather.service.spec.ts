import { TestBed } from '@angular/core/testing';

import { OpenWeatherService } from './open-weather.service';
import {City} from "../models/city.model";
import {of} from "rxjs";

describe('OpenWeatherService', () => {
  let service: OpenWeatherService;

  let httpClientSpy: { get: jasmine.Spy };
  let openWeatherService: OpenWeatherService;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(OpenWeatherService);
  // });
  //
  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });


  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    openWeatherService = new OpenWeatherService(httpClientSpy as any);
  });


  it('should return expected city weather info (HttpClient called once)', (done: DoneFn) => {
    const expectedResponse: City ={ lat: 1, lon: 1, current:1, hourly: [1,2] } ;

    httpClientSpy.get.and.returnValue(of(expectedResponse));

    openWeatherService.getOneCall({lat:52, lon: 4}).subscribe(
      res => {
        expect(res).toEqual(expectedResponse, 'expected response');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

});
