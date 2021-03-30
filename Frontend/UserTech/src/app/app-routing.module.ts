import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListStationBikesComponent} from './list-station-bikes/list-station-bikes.component';
import {LoginViewComponent} from './login-view/login-view.component';
import {StationActiveGuard} from './guards/station-active.guard';
import {MainComponent} from './main/main.component';
import {UserLoggedGuard} from './guards/user-logged.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginViewComponent
  },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [UserLoggedGuard]
  },
  {
    path: 'station/:id',
    component: ListStationBikesComponent,
    canActivate: [StationActiveGuard, UserLoggedGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
