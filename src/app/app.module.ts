import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PrimengModule } from './primeng/primeng.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    PrimengModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
