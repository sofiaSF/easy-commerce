import { NgModule } from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { ModalComponent } from './modal/modal.component';
import { HeaderComponent } from './header/header.component';
import { PrimengModule } from '../primeng/primeng.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [HeaderComponent,ModalComponent, TabComponent],
  imports: [
    CommonModule,
    PrimengModule
  ],
  providers: [],
  exports:[ModalComponent,TabComponent,HeaderComponent]
})
export class LibraryModule { }
