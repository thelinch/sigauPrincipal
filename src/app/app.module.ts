import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { NavegacionService } from './global/services/navegacion.service';
import { ParticlesModule } from 'angular-particle';
import { BlockUIModule } from 'ng-block-ui';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ParticlesModule
  ],
  exports: [],
  providers: [NavegacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
