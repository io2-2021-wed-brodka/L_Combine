import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListStationBikesComponent} from './components/list-station-bikes/list-station-bikes.component';
import {LoginViewComponent} from './components/login-view/login-view.component';
import {MainComponent} from './components/main/main.component';
import {UserLoggedGuard} from './guards/user-logged.guard';
import {HomeComponent} from './components/home/home.component';
import {ReturnBikeComponent} from './components/return-bike/return-bike.component';
import {BikeRentedGuard} from './guards/bike-rented.guard';
import {RegisterComponent} from './components/register/register.component';
import { TechPanelComponent } from './components/tech/tech-panel/tech-panel.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginViewComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'rental',
    component: MainComponent,
    canActivate: [UserLoggedGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'station/:id/:name',
        component: ListStationBikesComponent,
      },
      {
        path: 'return/:id',
        component: ReturnBikeComponent,
        canActivate: [BikeRentedGuard]
      },
      {
        path: 'tech',
        component: TechPanelComponent,
        canActivate: []
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'rental/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
