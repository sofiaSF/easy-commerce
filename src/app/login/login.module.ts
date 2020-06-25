import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginService } from '../services/login-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  providers: [],
  exports: [LoginComponent]
})
export class LoginModule { }
