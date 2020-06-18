import { NgModule } from '@angular/core';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersAdminComponent } from './users-admin.component';
import { FormService } from '../services/form.service';
import { LoginService } from '../services/login-service.service';
import { LibraryModule } from '../library/library.module';
import { ValidationService } from '../services/validation.service';
import { ServiceModule } from '../services/service.module';
import { DataViewModule } from 'primeng/dataview/dataview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [UserFormComponent,UsersAdminComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataViewModule,
    ServiceModule,
    LibraryModule
  ],
  providers:[LoginService,FormService,ValidationService],
  exports:[UserFormComponent,UsersAdminComponent]
})
export class UserAdminModule { }
