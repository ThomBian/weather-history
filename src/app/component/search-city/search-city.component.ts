import { Component, Inject } from '@angular/core';

import { CityW } from '../../data-model/city-wunderground';
import { CitiesService } from '../../service/cities.service';

@Component({
  selector: 'search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css'],
  providers: [CitiesService]
})

export class SearchCity {
  foundedCities: CityW[] = [];
  cityNameSearched: string;
  error: string;

  constructor(private citiesService:CitiesService) {}

  onSubmit():void {
    this.error = null;
    if(this.cityNameSearched){
      this.citiesService.getCitiesFromApi(this.cityNameSearched)
        .then(foundedCities => {
          this.foundedCities = foundedCities;
        })
        .catch(e => this.error = e);
    }
  }

  onSelect(city:CityW) {
  }
}