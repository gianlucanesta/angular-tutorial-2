import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
    // console.log('questa è la direttiva placeholder');
  }
}
