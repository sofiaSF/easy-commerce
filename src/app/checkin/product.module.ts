import { NgModule } from '@angular/core';
import { CheckinComponent } from './checkin.component';
import { LibraryModule } from '../library/library.module';
import { ServiceModule } from '../services/service.module';
import { ProductsService } from '../services/products.service';
import { DataViewModule } from 'primeng/dataview/dataview';
import { DropdownModule } from 'primeng/dropdown/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel/public_api';
import { InputSwitchModule } from 'primeng/inputswitch/public_api';
import { TooltipModule } from 'primeng/tooltip/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [CheckinComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataViewModule,
    DropdownModule,
    OverlayPanelModule,
    InputSwitchModule,
    TooltipModule,
    LibraryModule,
    ServiceModule
  ],
  providers:[ProductsService],
  exports: [CheckinComponent]
})
export class ProductModule { }
