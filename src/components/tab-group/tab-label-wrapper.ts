import {Directive, ElementRef} from "angular2/core";

@Directive({
  selector: '[md-tab-label-wrapper]'
})
export class MdTabLabelWrapper {
  constructor(public elementRef: ElementRef) {}

  /**
   * Sets focus on the wrapper element
   */
  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}