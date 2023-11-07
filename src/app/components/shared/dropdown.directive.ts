import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  // @HostBinding('class.open') isOpen = false;

  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    const dropdown = this.el.nativeElement.nextElementSibling;

    if (dropdown) {
      this.renderer.addClass(dropdown, 'show');
    }
  }

  @HostListener('document:click', ['$event.target']) onDocumentClick(
    target: any
  ) {
    const dropdown = this.el.nativeElement.nextElementSibling;

    if (dropdown && !dropdown.contains(target)) {
      this.renderer.removeClass(dropdown, 'show');
    }
  }
}
