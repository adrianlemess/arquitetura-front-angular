import { FilmTestingModule } from './../../testing/modules/film-testing.module';
import { OpeningCrawlComponent } from './opening-crawl.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';

describe('OpeningCrawlComponent', () => {
  let component: OpeningCrawlComponent;
  let fixture: ComponentFixture<OpeningCrawlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FilmTestingModule
      ],
      declarations: [ OpeningCrawlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningCrawlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
