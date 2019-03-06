import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appNavegacion]'
})
export class NavegacionDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
    console.log(viewContainerRef)
  }

}
