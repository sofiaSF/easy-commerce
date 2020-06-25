import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login-service.service';
import { AdminComponent } from './admin.component';
import { CategoryAdminModule } from '../category-admin/category-admin.module';
import { ProductAdminModule } from '../products-admin/product-admin.module';
import { UserAdminModule } from '../users-admin/user-admin.module';
import { LibraryModule } from '../library/library.module';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    LibraryModule,
    CategoryAdminModule,
    UserAdminModule,
    ProductAdminModule,
    AdminRoutingModule
  ],
  providers: [],
  exports: [AdminComponent]
})
export class AdminModule { }
