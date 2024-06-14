import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './User/login/login.component';
import { DashboardComponent } from './User/dashboard/dashboard.component';
import { RegisterComponent } from './User/register/register.component';
import { CountryListComponent } from './Country/country-list/country-list.component';
import { CountryFormComponent } from './Country/country-form/country-form.component';
import { AuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from './User/forget-password/forgot-password.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'forget-password',component:ForgotPasswordComponent},
  {path: 'reset-password',component:ResetPasswordComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'update/:id',component:RegisterComponent,canActivate:[AuthGuard]},
  {path:'country-list',component:CountryListComponent,canActivate:[AuthGuard]},
  {path:'addcountry',component:CountryFormComponent,canActivate:[AuthGuard]},
  {path:'editcountry/:id',component:CountryFormComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDataManagerRoutingModule { }
