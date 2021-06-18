import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { CitiesComponent } from './cities.component';
import { CityComponent } from './components/city/city.component';
import { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    CitiesComponent,
    CityComponent
  ],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    HttpClientModule
  ]
})
export class CitiesModule { }
