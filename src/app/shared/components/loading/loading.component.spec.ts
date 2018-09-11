import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { By } from '@angular/platform-browser';

describe('Componente Loader', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should check child element', () => {
    component.visible = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('img'))).toBeTruthy();
  });

  it('Shound change the visibility of the loading element according to \'visible\' variable', async(() => {

    component.visible = false;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('div').classList.contains('visible')).toBeFalsy();

    component.visible = true;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('div').classList.contains('visible')).toBeTruthy();
  }));

});
