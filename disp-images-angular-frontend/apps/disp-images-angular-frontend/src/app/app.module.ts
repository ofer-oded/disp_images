import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PauseIndicatorComponent } from './pause-indicator/pause-indicator.component';
import { CounterComponent } from './counter/counter.component';
import { EventComponent } from './event/event.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
  declarations: [
    AppComponent,
    PauseIndicatorComponent,
    CounterComponent,
    EventComponent,
    NavigatorComponent,
    PhotoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
