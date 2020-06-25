import { NgModule } from '@angular/core';
import { CheckoutComponent } from './checkout.component';
import { LibraryModule } from '../library/library.module';
import { ProductsService } from '../services/products.service';
import { PrimengModule } from '../primeng/primeng.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedServicesModule } from '../services/shared-services.module';


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    LibraryModule,
    CheckoutRoutingModule
  ],
  providers: [],
  exports: [CheckoutComponent]
})
export class CheckoutModule { }
