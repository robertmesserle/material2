import {Component, ViewEncapsulation} from 'angular2/core';
import {MD_TAB_GROUP_DIRECTIVES} from '../../components/tab-group/tab-group';
import {MdToolbar} from "../../components/toolbar/toolbar";

@Component({
  selector: 'tab-group-demo',
  templateUrl: 'demo-app/tab-group/tab-group-demo.html',
  styleUrls: ['demo-app/tab-group/tab-group-demo.css'],
  directives: [MD_TAB_GROUP_DIRECTIVES, MdToolbar],
  encapsulation: ViewEncapsulation.None,
})
export class TabGroupDemo {}