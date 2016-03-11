import {Directive, TemplateRef} from "angular2/core";
import {TemplatePortalDirective} from "../../core/portal/portal-directives";

@Directive({
  selector: '[md-tab-content]'
})
export class MdTabContent extends TemplatePortalDirective {
  constructor(templateRef: TemplateRef) {
    super(templateRef);
  }
}

