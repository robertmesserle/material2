import {PortalHostDirective} from "../../core/portal/portal-directives";
import {MdTabLabel} from "./tab-label";
import {ContentChildren, QueryList, Input, Component} from "angular2/core";

@Component({
  selector: 'md-tab-bar',
  templateUrl: './components/tab-group/tab-bar.html',
  styleUrls: ['./components/tab-group/tab-group.css'],
  directives: [PortalHostDirective, MdTabLabel],
})
export class MdTabBar {
  @ContentChildren(MdTabLabel) labels: QueryList<MdTabLabel>;
  @Input() selectedIndex: number = 0;
  
  nextTab(): void {
    if (this.selectedIndex < this.labels.length - 1) {
      this.selectedIndex++;
    }
  }
  
  previousTab(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
  }
}
