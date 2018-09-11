import { UiTestingModule } from './../../testing/modules/ui-testing.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutBaseComponent } from './layout-base.component';
import {  Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-dummy',
  template: `
    <app-layout-base>
      <h1> Component test </h1>
    </app-layout-base>
  `
})
class DummyComponent {

}

describe('LayoutBaseComponent', () => {
  let component: LayoutBaseComponent;
  let fixture: ComponentFixture<LayoutBaseComponent>;
  let componentDummy: DummyComponent;
  let fixtureDummy: ComponentFixture<DummyComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UiTestingModule
      ],
      declarations: [
        DummyComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutBaseComponent);
    component = fixture.componentInstance;

    fixtureDummy = TestBed.createComponent(DummyComponent);
    componentDummy = fixtureDummy.componentInstance;
    fixtureDummy.detectChanges();

    fixture.detectChanges();
  });

  it('should create component layout-base', () => {
    expect(component).toBeTruthy();
  });

  it('Should render something instead of ng-content inside of <app-layout-base></app-layout-base>', () => {
    const h1  = fixtureDummy.debugElement.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Component test ');
  });

  it('Should render <app-side-menu></app-side-menu>, <app-header></app-header>', () => {
    const appSideMenu = fixtureDummy.debugElement.nativeElement.querySelector('app-side-menu');
    const appHeader = fixtureDummy.debugElement.nativeElement.querySelector('app-header');
    const appNavbar = fixtureDummy.debugElement.nativeElement.querySelector('app-navbar');

    expect(appSideMenu).toBeDefined();
    expect(appHeader).toBeDefined();
    expect(appNavbar).toBeDefined();

  });
});
