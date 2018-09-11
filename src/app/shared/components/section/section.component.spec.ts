import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionComponent } from './section.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-dummy',
  template: `
    <app-section [titlePrimary]="this.titlePrimary" [titleSecondary]="titleSecondary">
      <p> Inside Content </p>
    </app-section>
  `
})
class DummyComponent {
  titlePrimary: string;
  titleSecondary: string;

  constructor() {
    this.titlePrimary = '';
    this.titleSecondary = '';
  }
}

describe('SectionComponent', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;
  let sectionComponent: SectionComponent;
  let sectionFixture: ComponentFixture<SectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionComponent, DummyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    sectionFixture = TestBed.createComponent(SectionComponent);
    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.debugElement.componentInstance;
    sectionComponent = sectionFixture.componentInstance;
    sectionFixture.detectChanges();
  });

  it('should create', () => {
    expect(sectionComponent).toBeTruthy();
  });

  it('Should render h1 titlePrimary', () => {
    component.titlePrimary = 'Hello World Teste';
    fixture.detectChanges();
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(h1.innerText).toContain('Hello World Teste');
  });

  it('Should render h3 titleSecondary', () => {
    component.titleSecondary = 'Hello World Subteste';
    fixture.detectChanges();
    const h3 = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3.innerText).toContain('Hello World Subteste');
  });

  it('Should not render h3 titleSecondary and h1 titlePrimary when not passed', () => {
    fixture.detectChanges();
    const h3 = fixture.debugElement.query(By.css('h3'));
    expect(h3).toBeNull();

    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1).toBeNull();
  });

  it('Should render any content inside div ng-content', () => {
    const conteudoInside = fixture.debugElement.query(By.css('.section-content p')).nativeElement;
    expect(conteudoInside.innerText).toContain('Inside Content');
  });
});
