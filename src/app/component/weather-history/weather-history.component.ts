import { Component, Input } from '@angular/core';

import { CityW } from '../../data-model/city-wunderground';

@Component({
    selector: 'weather-history',
    templateUrl: './weather-history.component.html',
    styleUrls: ['./weather-history.component.css']
})
export class WeatherHistory {
    @Input()
    city: CityW;
}