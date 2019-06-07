import { Component, OnInit, Output, EventEmitter, ViewChild, TemplateRef, ContentChild, ElementRef, AfterViewInit, ViewChildren, ViewContainerRef } from '@angular/core';
import { NavegacionService } from 'src/app/global/services/navegacion.service';
import { functionsGlobal } from 'src/app/global/funciontsGlobal';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {

  @ViewChild("navegacion", { static: false }) navegacionTemplate;
  constructor(private navegacionService: NavegacionService) { }
  ngAfterViewInit(): void {
  }
  ngOnInit() {
    this.iniciarNavegacion()
  }

  iniciarNavegacion() {
    this.navegacionService.transferirTemplate(this.navegacionTemplate)
  }

}
