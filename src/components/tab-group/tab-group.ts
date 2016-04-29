import {Component, Input, ViewChildren} from 'angular2/core';
import {QueryList} from "angular2/core";
import {ContentChildren} from "angular2/core";
import {PortalHostDirective} from "../../core/portal/portal-directives";
import {MdTabLabel} from "./tab-label";
import {MdTabContent} from "./tab-content";
import {MdTabBar} from "./tab-bar";
import {MdTabOutlet} from "./tab-outlet";
import {MdTabLabelWrapper} from "./tab-label-wrapper";
import {MdTabContentWrapper} from "./tab-content-wrapper";

/**
 * Used to generate unique ID's for each tab component
 * @type {number}
 */
let nextId: number = 0;

@Component({
  selector: 'md-tab-group',
  templateUrl: './components/tab-group/tab-group.html',
  styleUrls: ['./components/tab-group/tab-group.css'],
  directives: [PortalHostDirective, MdTabLabelWrapper, MdTabContentWrapper],
})
export class MdTabGroup {
  @ContentChildren(MdTabLabel) labels: QueryList<MdTabLabel>;
  @ContentChildren(MdTabContent) contents: QueryList<MdTabContent>;
  @ViewChildren(MdTabLabelWrapper) labelWrappers: QueryList<MdTabLabelWrapper>;
  @ViewChildren(MdTabContentWrapper) contentWrappers: QueryList<MdTabContentWrapper>;
  
  @Input()
  get selectedIndex(): number {
    return this._selectedIndex;
  }
  set selectedIndex(index: number) {
    this._selectedIndex = index;
  }

  private _selectedIndex: number = 0;
  private _focusIndex: number = 0;
  private _groupId: number;

  constructor() {
    this._groupId = nextId++;
  }
  
  ngAfterViewInit(): void {
    
  }

  /**
   * Used to tell the ink bar where it should be
   * @returns {any}
   */
  get currentLabelWrapper(): HTMLElement {
    return this.labelWrappers
        ? this.labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement
        : null;
  }

  /**
   * Tracks which element has focus; used for keyboard navigation
   * @returns {number}
   */
  get focusIndex(): number {
    return this._focusIndex;
  }

  /**
   * When the focus index is set, we must manually send focus to the correct label
   * @param value
   */
  set focusIndex(value: number) {
    this._focusIndex = value;
    this.labelWrappers.toArray()[value].focus();
  }
  
  /**
   * Returns a unique id for each tab label element
   * @param i
   * @returns {string}
   */
  getTabLabelId(i: number): string {
    return `md-tab-label-${this._groupId}-${i}`;
  }

  /**
   * Returns a unique id for each tab content element
   * @param i
   * @returns {string}
   */
  getTabContentId(i: number): string {
    return `md-tab-content-${this._groupId}-${i}`;
  }

  /**
   * Increment the selected index by 1; prevent going over the number of tabs
   */
  nextTab(): void {
    if (this.focusIndex < this.labels.length - 1) {
      this.focusIndex++;
    }
  }

  /**
   * Decrement the selected index by 1; prevent going below 0
   */
  previousTab(): void {
    if (this.focusIndex > 0) {
      this.focusIndex--;
    }
  }
}

export const MD_TAB_GROUP_DIRECTIVES = [MdTabGroup, MdTabLabel, MdTabContent, MdTabBar, MdTabOutlet];
