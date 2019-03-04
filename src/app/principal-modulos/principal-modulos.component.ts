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
    this.incializacion()
  }
  openSlideNav() {
    console.log(this.sideNav)
    $(this.sideNav.nativeElement).addClass("sidenav")
    $(this.sideNav.nativeElement).removeClass("hide-on-med-and-down")
    functionsGlobal.iniciarSideNav()
    functionsGlobal.openSideNav($(this.sideNav.nativeElement).attr("id"))
  }
  incializacion() {
    $(window).on("resize", () => {
      console.log($(window).width())
      if ($(window).width() >= 400) {
        $(this.sideNav.nativeElement).removeClass("sidenav")
        $(this.sideNav.nativeElement).css("transform", "translateX(0%)")
        $(this.sideNav.nativeElement).addClass("hide-on-med-and-down")

      }
    })
  }
}
