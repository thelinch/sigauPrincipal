import { Component, OnInit, ElementRef, ViewChild, ViewChildren, TemplateRef, ContentChild, ViewContainerRef, QueryList, AfterViewInit } from '@angular/core';
import * as $ from "jquery"
import { functionsGlobal } from '../global/funciontsGlobal';
import { NavegacionService } from '../global/services/navegacion.service';
import { NavegacionDirective } from '../global/directives/navegacion.directive';
@Component({
  selector: 'app-principal-modulos',
  templateUrl: './principal-modulos.component.html',
  styleUrls: ['./principal-modulos.component.scss']
})
export class PrincipalModulosComponent implements OnInit, AfterViewInit {

  @ViewChild("sideNav") sideNav: ElementRef;
  @ViewChildren(NavegacionDirective) queryList: QueryList<NavegacionDirective>
  constructor(private navegacionService: NavegacionService) { }

  ngOnInit() {
    functionsGlobal.iniciarCollapside();
    functionsGlobal.iniciarModal();
    functionsGlobal.iniciarMaterialBoxed();
    functionsGlobal.iniciarTooltip();
    functionsGlobal.iniciarSelect();
  }
  ngAfterViewInit(): void {
    console.log(this.queryList)
    this.captacionNavegacion()
  }
  captacionNavegacion() {
    this.navegacionService.navegacion.subscribe((template: TemplateRef<any>) => {
      this.queryList.map(navegacion =>
        navegacion.viewContainerRef.createEmbeddedView(template));
    })
  }
  openSlideNav() {

    functionsGlobal.iniciarSideNav()
    functionsGlobal.openSideNav($(this.sideNav.nativeElement).attr("id"))
  }

  template(evento: any) {
    console.log(evento)
  }
}
