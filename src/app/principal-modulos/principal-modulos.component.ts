import { Component, OnInit, ElementRef, ViewChild, ViewChildren, TemplateRef, ContentChild, ViewContainerRef, QueryList, AfterViewInit, Renderer2 } from '@angular/core';
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

  //@ViewChild("sideNav") sideNav: ElementRef;
  @ViewChild("menu") menu: ElementRef;
  //@ViewChildren("container") queryList: QueryList<NavegacionDirective>

  constructor(private navegacionService: NavegacionService, private renderer: Renderer2) { }

  ngOnInit() {
    functionsGlobal.iniciarCollapside();
    functionsGlobal.iniciarModal();
    functionsGlobal.iniciarMaterialBoxed();
    functionsGlobal.iniciarTooltip();
    functionsGlobal.iniciarSideNav();
    functionsGlobal.iniciarScrollSpy();
    functionsGlobal.iniciarDropdown();
    this.captacionNavegacion()
  }
  ngAfterViewInit(): void {
    //   console.log(this.queryList)
    console.log(this.menu)
  }
  captacionNavegacion() {
    this.navegacionService.navegacion.subscribe((template: TemplateRef<any>) => {
      console.log(template)
      //  this.renderer.appendChild(this.menu, template);
    })
  }

  template(evento: any) {
    console.log(evento)
  }
}
