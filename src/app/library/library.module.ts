import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabViewModule } from 'primeng/tabview/tabview';
import { DialogModule } from 'primeng/dialog/dialog';
import { TabComponent } from './tab/tab.component';
import { ModalComponent } from './modal/modal.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [HeaderComponent,ModalComponent, TabComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    TabViewModule,
    DialogModule,
  ],
  providers: [],
  exports:[ModalComponent,TabComponent,HeaderComponent]
})
export class LibraryModule { }
