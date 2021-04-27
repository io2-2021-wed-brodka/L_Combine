import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginViewComponent} from './components/login-view/login-view.component';
import {NotificationsComponent} from './components/notification/notifications.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {HttpErrorInterceptor} from './interceptors/http-error.interceptor';
import {MainComponent} from './components/main/main.component';
import {HomeComponent} from './components/home/home.component';
import {BikeViewComponent} from './components/bike-view/bike-view.component';
import {StationViewComponent} from './components/station-view/station-view.component';
import {UserViewComponent} from './components/user-view/user-view.component';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {BlockUserComponent} from './components/block-user/block-user.component';
import {ListBlockedUsersComponent} from './components/list-blocked-users/list-blocked-users.component';
import {UnblockUserComponent} from './components/unblock-user/unblock-user.component';
import {ListStationsComponent} from './components/station-view/list-stations/list-stations.component';
import {ListStationBikesComponent} from './components/station-view/list-station-bikes/list-station-bikes.component';
import {BikeManagementComponent} from './components/station-view/list-station-bikes/bike-management/bike-management.component';
import {StationManagementComponent} from './components/station-view/list-stations/station-management/station-management.component';
import {ListBikesComponent} from './components/list-bikes/list-bikes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    NotificationsComponent,
    MainComponent,
    HomeComponent,
    BikeViewComponent,
    StationViewComponent,
    UserViewComponent,
    ListUsersComponent,
    BlockUserComponent,
    ListBlockedUsersComponent,
    UnblockUserComponent,
    ListStationsComponent,
    ListStationBikesComponent,
    BikeManagementComponent,
    StationManagementComponent,
    UnblockUserComponent,
    ListBikesComponent
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
export class AppModule { }
