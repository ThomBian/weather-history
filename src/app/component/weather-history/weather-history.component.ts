import { Component, Input, OnChanges } from '@angular/core';

import { CityW } from '../../data-model/city-wunderground';
import { HistoryService } from '../../service/history.service';

@Component({
    selector: 'weather-history',
    templateUrl: './weather-history.component.html',
    styleUrls: ['./weather-history.component.css'],
    providers: [HistoryService]
})
export class WeatherHistory implements OnChanges {

    constructor(private historyService: HistoryService) {}

    @Input()
    city: CityW;

    observations:{} = {}

    ngOnChanges() {
        // call api to get history
        if (this.city) {
            const mockedDate = '20171209';
            this.historyService.getHistory(mockedDate, this.city.l)
                .then(results => {
                    this.observations = results;
                });
        }
    }
}