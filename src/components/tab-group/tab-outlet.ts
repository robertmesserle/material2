import {PortalHostDirective} from "../../core/portal/portal-directives";
import {MdTabContent} from "./tab-content";
import {ContentChildren, QueryList, Input, Component} from "angular2/core";

@Component({
  selector: 'md-tab-outlet',
  templateUrl: './components/tab-group/tab-outlet.html',
  styleUrls: ['./components/tab-group/tab-group.css'],
  directives: [PortalHostDirective, MdTabContent],
})
export class MdTabOutlet {
  @ContentChildren(MdTabContent) contents: QueryList<MdTabContent>;
  @Input() selectedIndex: number = 0;
}
