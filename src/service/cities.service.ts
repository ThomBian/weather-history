import { Injectable } from '@angular/core';

import { City } from '../data-model/city';
import { CITIES } from '../mock-data/mock-cities'; 

@Injectable()
export class CitiesService { 
    fectchCitiesByName(name: string): Promise<City[]> {
        return new Promise((resolve, reject) => {
            if (!name){
                reject(new Error('No name provided'));
            }
            const cities = CITIES.filter(city => city.name === name);
            if (!cities || cities.length < 1) {
                reject(new Error(`${name} not found`));
            }
            resolve(cities);
        });
    }
}