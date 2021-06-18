import {Component, Input, OnInit} from '@angular/core';
import {OpenWeatherService} from "../../services/open-weather.service";


/**
For providing clear reusable code block, card component is created.
*/


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  @Input() city: any;
  currentTemp: any;
  currentWindSpeed: any;
  bgColor: any;
  weatherState: any = 'Clear';
  showComponent = false;
  showDetail = false;
  oneHourLater: any;
  twoHourLater: any;
  threeHourLater: any;
  weatherIcon: any;

  constructor(private openWeatherService: OpenWeatherService) {
  }

  ngOnInit(): void {

    this.openWeatherService.getOneCall({lat: this.city.lat, lon: this.city.lon})
      .subscribe(response => {
        this.currentTemp = Math.round(response.current.temp);
        this.currentWindSpeed = response.current.wind_speed.toFixed(1);
        this.weatherState = response.current.weather[0].main;
        this.weatherIcon = response.current.weather[0].icon;
        this.showComponent = true;

        this.oneHourLater = {
          hour: this.getTime(response.hourly[0].dt),
          temperature: Math.round(response.hourly[0].temp),
          windState: response.hourly[0].weather[0].main
        };
        this.twoHourLater = {
          hour: this.getTime(response.hourly[1].dt),
          temperature: Math.round(response.hourly[1].temp),
          windState: response.hourly[1].weather[0].main
        };
        this.threeHourLater = {
          hour: this.getTime(response.hourly[2].dt),
          temperature: Math.round(response.hourly[2].temp),
          windState: response.hourly[2].weather[0].main
        };
      });
  }

  onClick(selectedCity: any) {
    this.showDetail = !this.showDetail;
  }

  getTime(timestamp: any) {
    const date = new Date(timestamp * 1000);
    const hours = "0" + date.getHours();
    const minutes = "0" + date.getMinutes();
    const formattedTime = hours.substr(-2) + ':' + minutes.substr(-2);
    return formattedTime;
  }
}
