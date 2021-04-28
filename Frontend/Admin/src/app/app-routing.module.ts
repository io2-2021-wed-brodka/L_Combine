import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BikeViewComponent } from './components/bike-view/bike-view.component';
import { HomeComponent } from './components/home/home.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { MainComponent } from './components/main/main.component';
import { StationViewComponent } from './components/station-view/station-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserLoggedGuard } from './guards/user-logged.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginViewComponent
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
        path: 'stations',
        component: StationViewComponent,
      },
      {
        path: 'bikes',
        component: BikeViewComponent,
      },
      {
        path: 'users',
        component: UserViewComponent,
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
export class AppRoutingModule { }
