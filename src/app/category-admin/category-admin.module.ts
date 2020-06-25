import { NgModule } from '@angular/core';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryAdminComponent } from './category-admin.component';
import { LibraryModule } from '../library/library.module';
import { CategoryService } from '../services/category.service';
import { FormService } from '../services/form.service';
import { ValidationService } from '../services/validation.service';
import { PrimengModule } from '../primeng/primeng.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CategoryFormComponent,CategoryAdminComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimengModule,
    LibraryModule
  ],
  providers: [],
  exports: [CategoryFormComponent,CategoryAdminComponent]
})
export class CategoryAdminModule { }
