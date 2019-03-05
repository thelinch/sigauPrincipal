import { Component, OnInit, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import * as $ from "jquery"
import { functionsGlobal } from './../../global/funciontsGlobal';
@Component({
  selector: 'app-principal-modulos',
  templateUrl: './principal-modulos.component.html',
  styleUrls: ['./principal-modulos.component.scss']
})
export class PrincipalModulosComponent implements OnInit {
  @ViewChild("sideNav") sideNav: ElementRef;
  constructor() { }

  ngOnInit() {
    functionsGlobal.iniciarCollapside()

  }
  openSlideNav() {

    functionsGlobal.iniciarSideNav()
    functionsGlobal.openSideNav($(this.sideNav.nativeElement).attr("id"))
  }

  template(evento: any) {
    console.log(evento)
  }
}
