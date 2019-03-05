import { Component, OnInit, Output, EventEmitter, ViewChild, TemplateRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @Output() navegacion: EventEmitter<TemplateRef<null>> = new EventEmitter();
  @ViewChild("navegacion") navegacionTemplate: TemplateRef<null>
  constructor() { }

  ngOnInit() {
    this.iniciarNavegacion()
  }
  iniciarNavegacion() {
    console.log(this.navegacionTemplate)
    this.navegacion.emit(this.navegacionTemplate)
  }

}
