import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { NavegacionService } from './global/services/navegacion.service';
import { ParticlesModule } from 'angular-particle';
import { BlockUIModule } from 'ng-block-ui';
import { MaterialModule } from './global/global.module';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppAdapter } from './global/appAdapter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ParticlesModule,
    MaterialModule
  ],
  exports: [],
  providers: [NavegacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
