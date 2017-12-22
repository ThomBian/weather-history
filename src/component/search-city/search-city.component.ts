import { Component } from '@angular/core';

import { City } from '../../data-model/city';
import { CitiesService } from '../../service/cities.service';

@Component({
  selector: 'search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})

export class SearchCity {

  foundedCities: City[] = [];
  
  cityNameSearched: string;
  
  constructor(private citiesService: CitiesService) { }

  onSubmit():void {
    // this.citiesService.fectchCitiesByName(this.cityNameSearched)
    //   .then(foundedCities => {
    //     this.foundedCities = foundedCities;
    //   });
  }
}