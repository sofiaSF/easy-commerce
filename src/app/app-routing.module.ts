import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CheckinComponent } from './checkin/checkin.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { AuthGuard } from './services/auth-guard';

const routes: Routes = [
{path:"",component: HomePageComponent},
{path:"admin",component:  AdminComponent,canActivate:[AuthGuard]},
{path:"checkout",component:  CheckoutComponent},
{path:"products",component:  CheckinComponent},
{path:"login",component:  LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
