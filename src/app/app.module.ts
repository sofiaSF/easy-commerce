import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CheckinComponent } from './checkin/checkin.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import {DataViewModule} from 'primeng/dataview';
import { ProductsService } from './services/products.service';
import {DropdownModule} from 'primeng/dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { ModalComponent } from './modal/modal.component';
import { TabComponent } from './tab/tab.component';
import {TabViewModule} from 'primeng/tabview';
import {DialogModule} from 'primeng/dialog';
import { ProductFormComponent } from './products-admin/product-form/product-form.component';
import { UserFormComponent } from './users-admin/user-form/user-form.component';
import { FormService } from './services/form.service';
import { HttpClient,HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FileUploadModule} from 'primeng/fileupload';
import { ImageService } from './services/image.service';
import { LoginService } from './services/login-service.service';
import { CategoryFormComponent } from './category-admin/category-form/category-form.component';
import { CategoryAdminComponent } from './category-admin/category-admin.component';
import { CategoryService } from './services/category.service';
import { ValidationService } from './services/validation.service';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TooltipModule} from 'primeng/tooltip';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthGuard } from './services/auth-guard';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    CheckinComponent,
    CheckoutComponent,
    AdminComponent,
    LoginComponent,
    ProductsAdminComponent,
    UsersAdminComponent,
    ModalComponent,
    TabComponent,
    ProductFormComponent,
    UserFormComponent,
    CategoryFormComponent,
    CategoryAdminComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    DataViewModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    TabViewModule,
    DialogModule,
    HttpClientModule,
    FileUploadModule,
    OverlayPanelModule,
    InputSwitchModule,
    TooltipModule  
  ],
  providers: [ProductsService,FormService,HttpClient,ImageService,LoginService,
  CategoryService,ValidationService,AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
