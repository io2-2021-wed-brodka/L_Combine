import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListStationBikesComponent } from './list-station-bikes/list-station-bikes.component';
import { ListStationsComponent } from './list-stations/list-stations.component';

@NgModule({
  declarations: [
    AppComponent,
    ListStationBikesComponent,
    ListStationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
