import {
    it, expect, beforeEach, inject, TestComponentBuilder, ComponentFixture,
    fakeAsync, tick, describe, flushMicrotasks
} from 'angular2/testing';
import {MD_TAB_GROUP_DIRECTIVES, MdTabGroup} from "./tab-group";
import {Component} from "angular2/core";
import {By} from 'angular2/platform/browser';

export function main() {
  describe('MdTabGroup', () => {
    let builder: TestComponentBuilder;

    beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      builder = tcb;
    }));
    
    it('should default to the first tab', (done: () => void) => {
      builder.createAsync(TestApp).then(fixture => {
        checkIndex(fixture, 1);
        done();
      });
    });
    
    it('should change selected index on click', (done: () => void) => {
      return builder.createAsync(TestApp).then((fixture: ComponentFixture) => {
        let component = fixture.debugElement.componentInstance;
        component.selectedIndex = 0;
        checkIndex(fixture, 0);
  
        // select the second tab
        let tabLabel = fixture.debugElement.query(By.css('.md-tab-label:nth-of-type(2)'));
        tabLabel.nativeElement.click();
        checkIndex(fixture, 1);
  
        // select the third tab
        tabLabel = fixture.debugElement.query(By.css('.md-tab-label:nth-of-type(3)'));
        tabLabel.nativeElement.click();
        checkIndex(fixture, 2);
        
        done();
      });
    });
    
    it('should cycle through tabs with nextTab/previousTab functions', (done: () => void) => {
      return builder.createAsync(TestApp).then((fixture: ComponentFixture) => {
        let component = fixture.debugElement.componentInstance;
        let tabComponent = fixture.debugElement.query(By.css('md-tab-group')).componentInstance;
        component.selectedIndex = 0;
        checkIndex(fixture, 0);
  
        tabComponent.nextTab();
        checkIndex(fixture, 1);
  
        tabComponent.nextTab();
        checkIndex(fixture, 2);
  
        tabComponent.nextTab();
        checkIndex(fixture, 2); // should stop at 2
  
        tabComponent.previousTab();
        checkIndex(fixture, 1);
  
        tabComponent.previousTab();
        checkIndex(fixture, 0);
  
        tabComponent.previousTab();
        checkIndex(fixture, 0); // should stop at 0
  
        done();
      });
    });
    
    it('should change tabs based on selectedIndex', (done: () => void) => {
      return builder.createAsync(TestApp).then((fixture: ComponentFixture) => {
        let component = fixture.debugElement.componentInstance;
        checkIndex(fixture, 1);
  
        component.selectedIndex = 2;
        checkIndex(fixture, 2);
       
        done();
      });
    });
  });
}

function checkIndex(fixture: ComponentFixture, index: number) {
  fixture.detectChanges();
  
  let tabComponent: MdTabGroup = fixture.debugElement.query(By.css('md-tab-group')).componentInstance;
  expect(tabComponent.selectedIndex).toBe(index);
  
  let tabLabelElement = fixture.debugElement.query(By.css(`.md-tab-label:nth-of-type(${index + 1})`)).nativeElement;
  expect(tabLabelElement.classList.contains('md-active')).toBe(true);

  let tabContentElement = fixture.debugElement.query(By.css(`#${tabLabelElement.id}`)).nativeElement;
  console.log(tabContentElement.outerHTML);
  expect(tabContentElement.classList.contains('md-active')).toBe(true);
}

@Component({
  selector: 'test-app',
  template: `
    <md-tab-group class="tab-group" [selectedIndex]="selectedIndex">
      <md-tab>
        <template md-tab-label>Tab One</template>
        <template md-tab-content>Tab one content</template>
      </md-tab>
      <md-tab>
        <template md-tab-label>Tab Two</template>
        <template md-tab-content>Tab two content</template>
      </md-tab>
      <md-tab>
        <template md-tab-label>Tab Three</template>
        <template md-tab-content>Tab three content</template>
      </md-tab>
    </md-tab-group>
  `,
  directives: [MD_TAB_GROUP_DIRECTIVES]
})
class TestApp {
  selectedIndex: number = 1;
}