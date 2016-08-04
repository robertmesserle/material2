import {
    NgModule,
    ContentChild,
    Directive,
    Component,
    Input,
    Output,
    ViewChildren,
    NgZone,
    EventEmitter,
    QueryList,
    ContentChildren,
    ViewEncapsulation,
} from '@angular/core';
import {NgIf, NgFor} from '@angular/common';
import {CommonModule} from '@angular/common';
import {PortalModule} from '@angular2-material/core/portal/portal-directives';
import {PortalHostDirective} from '@angular2-material/core/portal/portal-directives';
import {MdTabLabel} from '../tab-label';
import {MdTabLabelWrapper} from '../tab-label-wrapper';
import {MdInkBar} from '../ink-bar';
import {Observable} from 'rxjs/Observable';
import {Router, RouterLink} from '@angular/router';
import 'rxjs/add/operator/map';

// Due to a bug in the ChromeDriver, Angular 2 keyboard events are not triggered by `sendKeys`
// during E2E tests when using dot notation such as `(keydown.rightArrow)`. To get around this,
// we are temporarily using a single (keydown) handler.
// See: https://github.com/angular/angular/issues/9419
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const ENTER = 13;

/** A simple change event emitted on focus or selection changes. */
export class MdRouterTabChangeEvent {
  index: number;
  tab: MdRouterTab;
}

/** Used to generate unique ID's for each tab component */
let nextId = 0;

@Directive({
  selector: '[md-router-tab]'
})
export class MdRouterTab {}

@Component({
  moduleId: module.id,
  selector: 'md-router-tabs',
  templateUrl: 'router-tabs.html',
  styleUrls: ['router-tabs.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MdRouterTabs {
  @ContentChildren(MdRouterTab) _tabs: QueryList<MdRouterTab>;

  @ViewChildren(MdTabLabelWrapper) _labelWrappers: QueryList<MdTabLabelWrapper>;
  @ViewChildren(MdInkBar) _inkBar: QueryList<MdInkBar>;

  private _isInitialized: boolean = false;

  private _selectedIndex: number = 0;
  @Input()
  set selectedIndex(value: number) {
    if (value != this._selectedIndex) {
      this._selectedIndex = value;

      if (this._isInitialized) {
        this._onSelectChange.emit(this._createChangeEvent(value));
      }
    }
  }
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  /** Output to enable support for two-way binding on `selectedIndex`. */
  @Output('selectedIndexChange') private get _selectedIndexChange(): Observable<number> {
    return this.selectChange.map(event => event.index);
  }

  private _onFocusChange: EventEmitter<MdRouterTabChangeEvent> =
      new EventEmitter<MdRouterTabChangeEvent>();
  @Output('focusChange') get focusChange(): Observable<MdRouterTabChangeEvent> {
    return this._onFocusChange.asObservable();
  }

  private _onSelectChange: EventEmitter<MdRouterTabChangeEvent> =
      new EventEmitter<MdRouterTabChangeEvent>();
  @Output('selectChange') get selectChange(): Observable<MdRouterTabChangeEvent> {
    return this._onSelectChange.asObservable();
  }

  private _focusIndex: number = 0;
  private _groupId: number;

  constructor(private _zone: NgZone) {
    this._groupId = nextId++;
  }

  ngAfterViewInit() {
    console.log('init');
    debugger;
  }

  /**
   * Waits one frame for the view to update, then upates the ink bar
   * Note: This must be run outside of the zone or it will create an infinite change detection loop
   * TODO: internal
   */
  ngAfterViewChecked(): void {
    console.log('view checked');
    this._zone.runOutsideAngular(() => {
      window.requestAnimationFrame(() => {
        this._updateInkBar();
      });
    });
    this._isInitialized = true;
  }

  /** Tells the ink-bar to align itself to the current label wrapper */
  private _updateInkBar(): void {
    this._inkBar.toArray()[0].alignToElement(this._currentLabelWrapper);
  }

  /**
   * Reference to the current label wrapper; defaults to null for initial render before the
   * ViewChildren references are ready.
   */
  private get _currentLabelWrapper(): HTMLElement {
    return this._labelWrappers && this._labelWrappers.length
        ? this._labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement
        : null;
  }

  /** Tracks which element has focus; used for keyboard navigation */
  get focusIndex(): number {
    return this._focusIndex;
  }

  /** When the focus index is set, we must manually send focus to the correct label */
  set focusIndex(value: number) {
    this._focusIndex = value;

    if (this._isInitialized) {
      this._onFocusChange.emit(this._createChangeEvent(value));
    }

    if (this._labelWrappers && this._labelWrappers.length) {
      this._labelWrappers.toArray()[value].focus();
    }
  }

  private _createChangeEvent(index: number): MdRouterTabChangeEvent {
    const event = new MdRouterTabChangeEvent;
    event.index = index;
    if (this._tabs && this._tabs.length) {
      event.tab = this._tabs.toArray()[index];
    }
    return event;
  }

  /** Returns a unique id for each tab label element */
  _getTabLabelId(i: number): string {
    return `md-tab-label-${this._groupId}-${i}`;
  }

  /** Returns a unique id for each tab content element */
  _getTabContentId(i: number): string {
    return `md-tab-content-${this._groupId}-${i}`;
  }

  handleKeydown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case RIGHT_ARROW:
        this.focusNextTab();
        break;
      case LEFT_ARROW:
        this.focusPreviousTab();
        break;
      case ENTER:
        this.selectedIndex = this.focusIndex;
        break;
    }
  }

  /** Increment the focus index by 1; prevent going over the number of tabs */
  focusNextTab(): void {
    if (this._labelWrappers && this.focusIndex < this._labelWrappers.length - 1) {
      this.focusIndex++;
    }
  }

  /** Decrement the focus index by 1; prevent going below 0 */
  focusPreviousTab(): void {
    if (this.focusIndex > 0) {
      this.focusIndex--;
    }
  }
}
