import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginViewComponent} from './components/login-view/login-view.component';
import {FormsModule} from '@angular/forms';
import {ListStationBikesComponent} from './components/list-station-bikes/list-station-bikes.component';
import {ListStationsComponent} from './components/list-stations/list-stations.component';
import {ListRentedBikesComponent} from './components/list-rented-bikes/list-rented-bikes.component';
import {MainComponent} from './components/main/main.component';
import {RentBikeComponent} from './components/rent-bike/rent-bike.component';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {HttpErrorInterceptor} from './interceptors/http-error.interceptor';
import {HomeComponent} from './components/home/home.component';
import {RentedBikeDetailsComponent} from './components/rented-bike-details/rented-bike-details.component';
import {ReturnBikeComponent} from './components/return-bike/return-bike.component';
import {NotificationsComponent} from './components/notification/notifications.component';
import {ReservationListComponent} from './components/reservation-list/reservation-list.component';
import {ReservedBikeDetailsComponent} from './components/reserved-bike-details/reserved-bike-details.component';
import {RegisterComponent} from './components/register/register.component';
import { TechPanelComponent } from './components/tech/tech-panel/tech-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    ListStationBikesComponent,
    ListStationsComponent,
    ListRentedBikesComponent,
    RentBikeComponent,
    MainComponent,
    HomeComponent,
    RentedBikeDetailsComponent,
    ReturnBikeComponent,
    NotificationsComponent,
    ReservationListComponent,
    ReservedBikeDetailsComponent,
    RegisterComponent,
    TechPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
