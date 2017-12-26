import { Component, Inject, Output, EventEmitter } from '@angular/core';

import { CityW } from '../../data-model/city-wunderground';
import { CitiesService } from '../../service/cities.service';

@Component({
  selector: 'search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css'],
  providers: [CitiesService]
})

export class SearchCity {

  @Output()
  throwError = new EventEmitter();
  
  @Output()
  selectedCityEvent = new EventEmitter();

  foundedCities: CityW[] = [];
  cityNameSearched: string;

  constructor(private citiesService:CitiesService) {}

  onSubmit():void {
    if(this.cityNameSearched){
      this.citiesService.getCitiesFromApi(this.cityNameSearched)
        .then(foundedCities => {
          this.foundedCities = foundedCities;
        })
        .catch(e => this.throwError.emit(e));
    }
  }

  onSelect(city:CityW) {
    this.foundedCities = [];
    this.selectedCityEvent.emit(city);
  }
}