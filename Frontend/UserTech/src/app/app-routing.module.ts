import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListStationBikesComponent} from './list-station-bikes/list-station-bikes.component';
import {ListStationsComponent} from './list-stations/list-stations.component';

const routes: Routes = [
  {path: 'station/:id', component: ListStationBikesComponent},
  {path: 'stations', component: ListStationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
