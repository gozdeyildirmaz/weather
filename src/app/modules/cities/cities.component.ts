import { Component, OnInit } from '@angular/core';
import { Constants } from './constants/open-weather';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
cityList: any[] = Constants.cities;
  constructor() { }

  ngOnInit(): void {
  }

}
