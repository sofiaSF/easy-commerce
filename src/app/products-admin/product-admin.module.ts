import { NgModule } from '@angular/core';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsAdminComponent } from './products-admin.component';
import { ProductsService } from '../services/products.service';
import { FormService } from '../services/form.service';
import { ValidationService } from '../services/validation.service';
import { LibraryModule } from '../library/library.module';
import { PrimengModule } from '../primeng/primeng.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProductFormComponent,ProductsAdminComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimengModule,
    LibraryModule

  ],
  providers: [],
  exports: [ProductFormComponent,ProductsAdminComponent]
})
export class ProductAdminModule { }
