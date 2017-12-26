import { Component, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { CityW } from '../../data-model/city-wunderground';
import { HistoryService } from '../../service/history.service';

@Component({
    selector: 'weather-history',
    templateUrl: './weather-history.component.html',
    styleUrls: ['./weather-history.component.css'],
    providers: [HistoryService],
    encapsulation: ViewEncapsulation.None
})
export class WeatherHistory {

    constructor(private historyService: HistoryService) {}

    @Output()
    throwError = new EventEmitter();

    city: CityW;
    chosenDate: string;
    observations:{} = {}

    receivedChosenDateEvent(chosen:string){
        const data = chosen.split('/'); //[mm, dd, yyyy]
        const formatedDate = this.formatDate(+data[2], +data[1], +data[0]);
        const yesterday = this.getYesterday();
        console.log('comare:', formatedDate, yesterday, formatedDate > yesterday);
        if (formatedDate > yesterday) {
            this.throwError.emit(`The chosen date (${chosen}) has to be in the past`);
        } else {
            this.chosenDate = chosen;
            return this.getHistory(formatedDate);
        }
    }

    setCity(city:CityW){
        this.city = city;
        this.chosenDate = 'Yesterday';
        this.getHistory(this.getYesterday());
    }

    private getYesterday():string {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        let dd = date.getDate();
        let mm = date.getMonth()+1;
        let yyyy = date.getFullYear();
        return this.formatDate(dd, mm, yyyy);
    }

    private formatDate(dd:number, mm:number, yyyy:number) {
        return `${yyyy}${mm<10? '0'+mm:mm}${dd<10? '0'+dd:dd}`; // 1993'9'1 => 1993'09'01
    }

    private getHistory(date:string) {
        if (this.city){            
            this.historyService.getHistory(date, this.city.l)
            .then(results => {
                this.observations = results;
            })
            .catch(console.error);
        }
    }
}