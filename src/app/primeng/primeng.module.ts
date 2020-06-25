import { NgModule } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [],
  imports: [
    DataViewModule,
    DropdownModule,
    TabViewModule,
    DialogModule,
    FileUploadModule,
    OverlayPanelModule,
    InputSwitchModule,
    TooltipModule
  ],
  exports : [
    DataViewModule,
    DropdownModule,
    TabViewModule,
    DialogModule,
    FileUploadModule,
    OverlayPanelModule,
    InputSwitchModule,
    TooltipModule
  ]
})
export class PrimengModule { }
