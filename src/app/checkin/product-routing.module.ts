import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckinComponent } from './checkin.component';
import { SharedServicesModule } from '../services/shared-services.module';


const routes: Routes = [
  {path:"",component: CheckinComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }


