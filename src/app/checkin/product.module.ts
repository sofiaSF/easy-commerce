import { NgModule } from '@angular/core';
import { CheckinComponent } from './checkin.component';
import { LibraryModule } from '../library/library.module';
import { ProductsService } from '../services/products.service';
import { PrimengModule } from '../primeng/primeng.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { SharedServicesModule } from '../services/shared-services.module';


@NgModule({
  declarations: [CheckinComponent],
  imports: [
    PrimengModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LibraryModule,
    ProductRoutingModule
  ],
  providers:[],
  exports: [CheckinComponent]
})
export class ProductModule { }
