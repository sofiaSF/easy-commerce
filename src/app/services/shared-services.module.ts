import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './auth-guard';;
import { CategoryService } from './category.service';
import { FormService } from './form.service';
import { ImageService } from './image.service';
import { LoginService } from './login-service.service';
import { ProductsService } from './products.service';
import { ValidationService } from './validation.service';


@NgModule({
})
export class SharedServicesModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedServicesModule,
      providers: [ AuthGuard, CategoryService,
      FormService,ImageService, CategoryService, FormService, ImageService,
      LoginService, ProductsService, ValidationService ]
    }
  }
}

