import {Component, ViewEncapsulation} from '@angular/core';
import {RouterConfig, ROUTER_DIRECTIVES} from '@angular/router';
import {NgIf, NgFor, AsyncPipe} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'router-tabs-demo',
  templateUrl: 'router-tabs-demo.html',
  styleUrls: ['router-tabs-demo.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RouterTabsDemo {
}

@Component({
  moduleId: module.id,
  selector: 'first-tab',
  template: 'First Tab'
})
class FirstTabComponent {}

@Component({
  moduleId: module.id,
  selector: 'second-tab',
  template: 'Second Tab'
})
class SecondTabComponent {}

export const routes: RouterConfig = [
  { path: '', redirectTo: 'first-tab' },
  { path: 'first-tab', component: FirstTabComponent },
  { path: 'second-tab', component: SecondTabComponent },
];
