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
import {TechPanelComponent} from './components/tech/tech-panel/tech-panel.component';
import {ListBikesComponent} from './components/tech/list-bikes/list-bikes.component';
import {BlockBikeComponent} from './components/tech/block-bike/block-bike.component';
import {UnblockBikeComponent} from './components/tech/unblock-bike/unblock-bike.component';
import {ListMalfunctionsComponent} from './components/malfunctions/list-malfunctions/list-malfunctions.component';
import {MalfunctionPanelComponent} from './components/malfunctions/malfunction-panel/malfunction-panel.component';
import {MalfunctionDetailsComponent} from './components/malfunctions/malfunction-details/malfunction-details.component';
import {NewMalfunctionComponent} from './components/malfunctions/new-malfunction/new-malfunction.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
    ListBikesComponent,
    BlockBikeComponent,
    UnblockBikeComponent,
    ListMalfunctionsComponent,
    MalfunctionPanelComponent,
    MalfunctionDetailsComponent,
    NewMalfunctionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
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
