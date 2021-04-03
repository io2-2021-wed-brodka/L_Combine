import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListStationBikesComponent} from './components/list-station-bikes/list-station-bikes.component';
import {LoginViewComponent} from './components/login-view/login-view.component';
import {StationActiveGuard} from './guards/station-active.guard';
import {MainComponent} from './components/main/main.component';
import {UserLoggedGuard} from './guards/user-logged.guard';
import {HomeComponent} from './components/home/home.component';

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
        path: 'station/:id',
        component: ListStationBikesComponent,
        canActivate: [StationActiveGuard]
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
