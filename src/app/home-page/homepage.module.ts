import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { LibraryModule } from '../library/library.module';
import { HomepageRoutingModule } from './homepage-routing.module';


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    LibraryModule,
    HomepageRoutingModule
  ],
  exports: [HomePageComponent]
})
export class HomepageModule { }
