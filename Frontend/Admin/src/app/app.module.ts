import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { NotificationsComponent } from './components/notification/notifications.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { BikeViewComponent } from './components/bike-view/bike-view.component';
import { StationViewComponent } from './components/station-view/station-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

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
    ListUsersComponent
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
