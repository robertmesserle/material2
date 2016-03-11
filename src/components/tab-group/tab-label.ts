import {Directive, TemplateRef} from "angular2/core";
import {TemplatePortalDirective} from "../../core/portal/portal-directives";

@Directive({
  selector: '[md-tab-label]',
})
export class MdTabLabel extends TemplatePortalDirective {
  constructor(public templateRef: TemplateRef) {
    super(templateRef);
  }
}

