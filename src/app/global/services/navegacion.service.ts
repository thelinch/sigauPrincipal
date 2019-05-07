import { Injectable, TemplateRef, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {
  navegacion: Subject<TemplateRef<any>> = new Subject<TemplateRef<any>>()
  constructor() { }
  transferirTemplate(template) {
    console.log(template)
    this.navegacion.next(template)
  }
}
