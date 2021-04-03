import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

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

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    ListStationBikesComponent,
    ListStationsComponent,
    ListRentedBikesComponent,
    RentBikeComponent,
    MainComponent,
    HomeComponent
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
