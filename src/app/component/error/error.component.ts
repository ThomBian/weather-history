import { Component } from '@angular/core';

@Component({
    selector: 'error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent {
    errors: string[] = [];

    addError(error:string) {
        this.errors.push(error);
    }

    remove() {
        this.errors = [];
    }
}