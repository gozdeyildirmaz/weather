import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Constants} from '../constants/open-weather';
import {City} from "../models/city.model";

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  constructor(private http: HttpClient) { }

  getOneCall(parameters : any): Observable<any> {

    const payload = new HttpParams()
      .set('lat', parameters.lat)
      .set('lon', parameters.lon)
      .set('exclude', 'minutely,daily,alerts' )  /** I prefered reduce http response size with exclude parameter for performance. */
      .set('units', 'metric' )
      .set('appid', Constants.appId);
    const httpOptions = {
      params: payload
    };
    return this.http.get<City>(Constants.apiUrl, httpOptions);

  }
}
