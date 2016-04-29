import {Input, Directive} from "angular2/core";

@Directive({
  selector: 'md-ink-bar',
  host: {
    '[style.left.px]': 'leftPosition',
    '[style.width.px]': 'labelWidth',
  },
})
export class MdInkBar {
  @Input() alignToElement: HTMLElement;
  
  get leftPosition(): number {
    return this.alignToElement
        ? this.alignToElement.offsetLeft
        : 0;
  }
  
  get labelWidth(): number {
    return this.alignToElement
        ? this.alignToElement.offsetWidth
        : 0;
  }
}