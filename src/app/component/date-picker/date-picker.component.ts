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
        let dd = this.chosenDate.getDate();
        let mm = this.chosenDate.getMonth()+1;
        let yyyy = this.chosenDate.getFullYear();
        this.shareChosenDate.emit(this.formatDate(dd, mm, yyyy));
    }

    private formatDate(dd:number, mm:number, yyyy:number) {
        return `${yyyy}/${mm<10? '0'+mm:mm}/${dd<10? '0'+dd:dd}`; // 1993'9'1 => 1993/09/01
    }
}