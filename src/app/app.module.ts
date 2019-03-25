import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { NavegacionService } from './global/services/navegacion.service';
import { ParticlesModule } from 'angular-particle';
import { BlockUIModule } from 'ng-block-ui';
import { MaterialModule } from './global/global.module';
import { registerLocaleData } from '@angular/common';
// importar locales
import localePy from '@angular/common/locales/es-PY';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
registerLocaleData(localePy, 'es');

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
    MaterialModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [],
  providers: [NavegacionService, { provide: LOCALE_ID, useValue: "es" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
