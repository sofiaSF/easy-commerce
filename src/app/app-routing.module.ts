import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
{path:"",loadChildren: () => import('./home-page/homepage.module').then(m => m.HomepageModule)},
{path:"admin",loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
{path:"checkout",loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)},
{path:"products",loadChildren: () => import('./checkin/product.module').then(m => m.ProductModule)}, 
{path:"login",loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
{ path: "", redirectTo: "", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
