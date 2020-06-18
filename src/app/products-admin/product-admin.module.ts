import { NgModule } from '@angular/core';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsAdminComponent } from './products-admin.component';
import { ProductsService } from '../services/products.service';
import { FormService } from '../services/form.service';
import { ValidationService } from '../services/validation.service';
import { ServiceModule } from '../services/service.module';
import { DataViewModule } from 'primeng/dataview/dataview';
import { DropdownModule } from 'primeng/dropdown/dropdown';
import { FileUploadModule } from 'primeng/fileupload/fileupload';
import { LibraryModule } from '../library/library.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [ProductFormComponent,ProductsAdminComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataViewModule,
    DropdownModule,
    FileUploadModule,
    LibraryModule,
    ServiceModule
  ],
  providers: [ProductsService,FormService,ValidationService],
  exports: [ProductFormComponent,ProductsAdminComponent]
})
export class ProductAdminModule { }
