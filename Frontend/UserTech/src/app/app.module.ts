import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { FormsModule } from '@angular/forms';
import { ListStationBikesComponent } from './list-station-bikes/list-station-bikes.component';
import { ListStationsComponent } from './list-stations/list-stations.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    ListStationBikesComponent,
    ListStationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
