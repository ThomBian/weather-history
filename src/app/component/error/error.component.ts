import { Component, ViewEncapsulation } from '@angular/core';

import { ErrorInternal } from '../../data-model/error-internal';

const DISPLAY_TIME = 5000;


@Component({
    selector: 'error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css'],
    encapsulation: ViewEncapsulation.None

})
export class ErrorComponent {
    private id: number = -1;
    errors: ErrorInternal[] = [];

    addError(error: string) {
        this.id = this.id + 1;
        const idError = this.id;
        this.errors.push({
            id: idError,
            message: error
        });
        setTimeout(() => {
            this.removeError(idError);
        }, DISPLAY_TIME);
    }

    removeError(id: number) {
        this.errors = this.errors.filter(error => error.id !== id);
    }

    remove() {
        this.errors = [];
    }
}