import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { MainComponent } from './components/main/main.component';
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
