import { NgModule } from '@angular/core';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersAdminComponent } from './users-admin.component';
import { FormService } from '../services/form.service';
import { LoginService } from '../services/login-service.service';
import { LibraryModule } from '../library/library.module';
import { ValidationService } from '../services/validation.service';
import { PrimengModule } from '../primeng/primeng.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserFormComponent,UsersAdminComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimengModule,
    LibraryModule
  ],
  providers:[],
  exports:[UserFormComponent,UsersAdminComponent]
})
export class UserAdminModule { }
