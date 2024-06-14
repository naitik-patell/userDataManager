import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrim]'
})
export class TrimDirective {

  constructor(private ngControl: NgControl) { }

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    console.log("trim directive called");
    
    const input = event.target;
    const trimmedValue = input.value.trim();
     // Check if control is not null
     if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(trimmedValue, { emitEvent: false });
    }
  }
}
