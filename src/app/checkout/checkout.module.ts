import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { LibraryModule } from '../library/library.module';
import { ServiceModule } from '../services/service.module';
import { ProductsService } from '../services/products.service';
import { DataViewModule } from 'primeng/dataview/dataview';
import { DropdownModule } from 'primeng/dropdown/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataViewModule,
    DropdownModule,
    LibraryModule,
    ServiceModule
  ],
  providers: [ProductsService],
  exports: [CheckoutComponent]
})
export class CheckoutModule { }
