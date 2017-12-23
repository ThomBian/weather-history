import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { SearchCity } from './component/search-city/search-city.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchCity
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
