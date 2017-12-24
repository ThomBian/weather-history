import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Config } from '../config';

@Injectable()
export class HistoryService {
    constructor(private http:Http) {}

    getHistory(date:string, ZMW:string): Promise<{}> {
        this.assertParamIsDefined(date);
        this.assertParamIsDefined(ZMW);
        const formattedZMW = ZMW.charAt(0) === '/' ? ZMW : `/${ZMW}`;
        const formattedDate = `history_${date}`;
        const url = Config.forgeUrl(`/${formattedDate}${formattedZMW}.json`);
        return this.http.get(url)
            .toPromise()
            .then(response => {
                const jsonResponse = response.json();
                this.assertAPIIsOk(jsonResponse.response);
                let observations = this.createObservations(jsonResponse.history.observations);
                return observations;
            })
            .catch(this.handleError);
    }

    private createObservations (observations:any[]):{} {
        return observations.reduce((acc, observation) => {
            let hour = `${observation.date.hour}:${observation.date.min}`;
            acc[hour] = parseFloat(observation.tempm);
            return acc;
        }, {});
    }

    private assertParamIsDefined(paramToCheck) {
        if(!paramToCheck || paramToCheck === null) {
            throw new Error("Param is not defined");
        }
    }

    private assertAPIIsOk(response: any) {
        if(response.error) {
            const e = new Error();
            e.message = response.error.description;
            throw (e);
        }
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}