import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { FormsModule } from '@angular/forms';
import { ListStationBikesComponent } from './list-station-bikes/list-station-bikes.component';
import { ListStationsComponent } from './list-stations/list-stations.component';
import { ListRentedBikesComponent } from './list-rented-bikes/list-rented-bikes.component';
import { MainComponent } from './main/main.component';
import { RentBikeComponent } from './rent-bike/rent-bike.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    ListStationBikesComponent,
    ListStationsComponent,
    ListRentedBikesComponent,
    RentBikeComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
