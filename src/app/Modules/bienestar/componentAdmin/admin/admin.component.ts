import { Component, OnInit, Output, EventEmitter, ViewChild, TemplateRef, ContentChild, ElementRef } from '@angular/core';
import { NavegacionService } from 'src/app/global/services/navegacion.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild("navegacion") navegacionTemplate: TemplateRef<any>
  constructor(private navegacionService: NavegacionService) { }

  ngOnInit() {
    this.iniciarNavegacion()

  }
  iniciarNavegacion() {
    this.navegacionService.transferirTemplate(this.navegacionTemplate)
  }

}
