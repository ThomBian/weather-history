import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {CalendarModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { ErrorComponent } from './component/error/error.component';
import { SearchCity } from './component/search-city/search-city.component';
import { WeatherHistory } from './component/weather-history/weather-history.component';
import { Histogram } from './component/historgram/histogram.component';
import { DatePicker } from './component/date-picker/date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    SearchCity,
    WeatherHistory,
    Histogram,
    DatePicker
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CalendarModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
