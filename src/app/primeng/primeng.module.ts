import { NgModule } from '@angular/core';
import { DataViewModule } from 'primeng/dataview/dataview';
import { DropdownModule } from 'primeng/dropdown/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabViewModule } from 'primeng/tabview/tabview';
import { DialogModule } from 'primeng/dialog/dialog';
import { FileUploadModule } from 'primeng/fileupload/fileupload';
import { OverlayPanelModule } from 'primeng/overlaypanel/public_api';
import { InputSwitchModule } from 'primeng/inputswitch/public_api';
import { TooltipModule } from 'primeng/tooltip/tooltip';



@NgModule({
  declarations: [],
  imports: [
    DataViewModule,
    DropdownModule,
    BrowserAnimationsModule,
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
    BrowserAnimationsModule,
    TabViewModule,
    DialogModule,
    FileUploadModule,
    OverlayPanelModule,
    InputSwitchModule,
    TooltipModule
  ]
})
export class PrimengModule { }
