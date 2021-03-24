import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRentedBikesComponent } from './list-rented-bikes/list-rented-bikes.component';
import {ListStationBikesComponent} from './list-station-bikes/list-station-bikes.component';
import {ListStationsComponent} from './list-stations/list-stations.component';
import { LoginViewComponent } from './login-view/login-view.component';

const routes: Routes = [
  {path: 'station/:id', component: ListStationBikesComponent},
  {path: 'stations', component: ListStationsComponent},
  {path: 'rentedBikes', component: ListRentedBikesComponent},
  {path: 'login', component: LoginViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
