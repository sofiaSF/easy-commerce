import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginService } from '../services/login-service.service';
import { ServiceModule } from '../services/service.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ServiceModule
  ],
  providers: [LoginService],
  exports: [LoginComponent]
})
export class LoginModule { }
