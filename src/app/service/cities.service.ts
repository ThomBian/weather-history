import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { City } from '../data-model/city';
import { CityW } from '../data-model/city-wunderground';
import { CITIES } from '../mock-data/mock-cities';
import { Config } from '../config';

@Injectable()
export class CitiesService { 
    private urlRequest:string;

    constructor(private http:Http){
        this.urlRequest = '/geolookup/q/FR/';
    }

    fectchCitiesByName(name: string): Promise<City[]> {
        return new Promise((resolve, reject) => {
            this.assertNameIsOk(name);
            const cities = this.getCitiesByNameMock(name);
            if (!cities || cities.length < 1) {
                reject(new Error(`${name} not found`));
            }
            resolve(cities);
        });
    }

    private getCitiesByNameMock(name: string): City[] {
        const formattedName = name.toLowerCase().replace(/ /g, ''); //remove white spaces
        return CITIES.filter(city => city.formattedName === formattedName);
    }

    getCitiesFromApi(name: string): Promise<CityW[]>{
        this.assertNameIsOk(name);
        const formattedName = name.toLowerCase().trim().replace(/ /g, '_');
        const url = Config.forgeUrl(`${this.urlRequest}/${name}.json`);
        return this.http.get(url)
            .toPromise()
            .then(response => {
                const jsonResponse = response.json();
                this.assertAPIIsOk(jsonResponse.response, name);
                let cities: CityW[] = [];
                if (jsonResponse.location) {
                    const cityFounded: CityW = jsonResponse.location as CityW;
                    cities.push(cityFounded);
                }
                if (jsonResponse.response.results) {
                    cities = jsonResponse.response.results as CityW[];
                }
                return cities;
            })
            .catch(this.handleError);
    }

    private assertAPIIsOk(response: any, city:string) {
        if(response.error) {
            const e = new Error();
            e.message = `${response.error.description} (${city})`;
            throw (e);
        }
    }

    private assertNameIsOk(name: string) {
        if (!name){
            throw(new Error('No name provided'));
        }
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}