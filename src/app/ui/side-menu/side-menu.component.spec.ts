import { RouterTestingModule } from '@angular/router/testing';
import { MenuItem } from './../models/menu';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

import { SideMenuComponent } from './side-menu.component';
import { By } from '@angular/platform-browser';
import { UiTestingModule } from '../../testing/modules/ui-testing.module';



describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UiTestingModule,
      ],
      declarations: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    component.menuItens = [
      new MenuItem({
        label: 'Teste 1 ',
        routerLink: ['/films', 1]
      }),
      new MenuItem({
        label: 'Teste 2 ',
        routerLink: ['/films', 2]
      })
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should render <a> </a> links as menuItens Array passed', () => {

    const aLinks = fixture.debugElement.queryAll(By.css('a'));

    expect(aLinks.length).toEqual(2);
  });

  afterAll(() => {
    component.menuItens = null;
    fixture.detectChanges();
  });

});
