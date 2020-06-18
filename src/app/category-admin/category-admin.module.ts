import { NgModule } from '@angular/core';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryAdminComponent } from './category-admin.component';
import { LibraryModule } from '../library/library.module';
import { ServiceModule } from '../services/service.module';
import { CategoryService } from '../services/category.service';
import { FormService } from '../services/form.service';
import { ValidationService } from '../services/validation.service';
import { DropdownModule } from 'primeng/dropdown/dropdown';
import { DataViewModule } from 'primeng/dataview/dataview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [CategoryFormComponent,CategoryAdminComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataViewModule,
    DropdownModule,
    LibraryModule,
    ServiceModule
  ],
  providers: [CategoryService,FormService,ValidationService],
  exports: [CategoryFormComponent,CategoryAdminComponent]
})
export class CategoryAdminModule { }
