import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollDirective]'
})
export class ScrollDirectiveDirective {
  @HostListener('window:scroll',['$event'])
  onScroll(event)
  {
    console.log("hola");
  }
  constructor() { }

}
