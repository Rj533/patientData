import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { InvalidComponent } from './invalid/invalid.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component:LandingComponent
    
  },
  {
    path: 'login',
    component: LoginComponent
  },
  
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'add',
    component: PatientAddComponent
  },
  {
    path: 'edit',
    component: PatientEditComponent
  },
  {
    path: '**',
    component:InvalidComponent
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
