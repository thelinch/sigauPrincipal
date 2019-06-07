import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { NavegacionService } from './global/services/navegacion.service';
import { BlockUIModule } from 'ng-block-ui';
import { MaterialModule } from './global/global.module';
import { registerLocaleData } from '@angular/common';
// importar locales
import localePy from '@angular/common/locales/es-PY';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AlumnoService } from './global/services/alumno.service';
import { HttpClientModule } from '@angular/common/http';
import { FileService } from './global/services/file.service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { ParticlesModule } from 'angular-particle';
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
    ParticlesModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    environment.production ?
        [] :
        [ AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot() ],

  ],
  exports: [],
  providers: [NavegacionService, { provide: LOCALE_ID, useValue: "es" }, AlumnoService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
