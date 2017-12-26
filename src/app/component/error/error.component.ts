import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css'],
    encapsulation: ViewEncapsulation.None

})
export class ErrorComponent {
    private ErrorLogo = require('./error.svg');
    private id:number = -1;
    errors: {
        id:number,
        message:string
    }[] = [];

    addError(error:string) {
        this.id = this.id + 1;
        this.errors.push({
            id: this.id,
            message: error
        });
    }

    removeError(id: number) {
        this.errors = this.errors.filter(error => error.id !== id);
    }

    remove() {
        this.errors = [];
    }
}