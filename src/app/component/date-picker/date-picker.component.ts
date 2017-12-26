import {Component, Output, EventEmitter, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DatePicker {
    @Output()
    shareChosenDate = new EventEmitter();

    chosenDate: Date;

    onDateChanged() {
        this.shareChosenDate.emit(this.chosenDate.toLocaleDateString());
    }
}