import { Planet } from './../models/planets';
import { Film } from './../models/films';
import { filmsData } from './../../services/mocks/film.mock';
import { StateName, fromFilmActions } from './../../store/index';
import { of, throwError } from 'rxjs';
import { FilmsService } from './../../services/films.service';
import { Store } from '@ngrx/store';
import { FilmTestingModule } from './../../testing/modules/film-testing.module';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppState } from '../../store';
import { PlanetsComponent } from './planets.component';

describe('PlanetsComponent', () => {
  let component: PlanetsComponent;
  let fixture: ComponentFixture<PlanetsComponent>;
  let store: Store<AppState>;
  let filmsService: FilmsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FilmTestingModule
      ],
      declarations: [ PlanetsComponent ]
    })
    .compileComponents()
      .then(() => {
        store = TestBed.get(Store);
        filmsService = TestBed.get(FilmsService);
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() - Should call subscribeStoreFilm()', () => {
    spyOn(component, 'subscribeStoreFilm');

    component.ngOnInit();
    expect(component.subscribeStoreFilm).toHaveBeenCalled();
  });


  describe('subscribeStoreFilm()', () => {
    it('Should call store select', fakeAsync(() => {
      spyOn(store, 'select').and.returnValue(of('ok'));
      component.subscribeStoreFilm();
      expect(store.select).toHaveBeenCalled();
      expect(store.select).toHaveBeenCalledWith(StateName.FILMS);
    }));

    it('Should fill the component.selectedFilm from store', fakeAsync(() => {
      spyOn(component, 'getPlanetsData');
      const selectedFilm = new Film(filmsData.films[0]);
      store.dispatch(new fromFilmActions.SetSelectedFilm(selectedFilm));
      component.subscribeStoreFilm();
      tick(10);
      expect(component.selectedFilm).toEqual(selectedFilm);
    }));


    it('Should call getPlanetsData() with selectedFilm', fakeAsync(() => {
      const selectedFilm = new Film(filmsData.films[0]);
      spyOn(component, 'getPlanetsData');
      store.dispatch(new fromFilmActions.SetSelectedFilm(selectedFilm));
      component.subscribeStoreFilm();
      tick(10);
      expect(component.getPlanetsData).toHaveBeenCalled();
      expect(component.getPlanetsData).toHaveBeenCalledWith(selectedFilm);

    }));
  });

  it('setLoading() - Should call store.dispatch action SetFieldFilm', () => {
    spyOn(store, 'dispatch');
    component.setLoading(true);
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromFilmActions.SetFieldFilm({
        index: 'loadingData', value: true
      }));

    component.setLoading(false);
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromFilmActions.SetFieldFilm({
        index: 'loadingData', value: false
      }));
  });

  describe('getPlanetsData()', () => {
    const selectedFilm = new Film(filmsData.films[0]);
    it('Should call setLoading twice', fakeAsync(() => {
      spyOn(component, 'setLoading');

      component.getPlanetsData(selectedFilm);

      tick(10);

      expect(component.setLoading).toHaveBeenCalled();
      expect(component.setLoading).toHaveBeenCalledWith(true);
      expect(component.setLoading).toHaveBeenCalledWith(false);
    }));

    it('Should call setLoading twice even with error', fakeAsync(() => {
      spyOn(component, 'setLoading');
      spyOn(filmsService, 'getPlanetsByArrayResourcesByFilm')
        .and.returnValue(throwError('erro'));

      component.getPlanetsData(selectedFilm);

      tick(10);

      expect(component.setLoading).toHaveBeenCalled();
      expect(component.setLoading).toHaveBeenCalledWith(true);
      expect(component.setLoading).toHaveBeenCalledWith(false);
    }));

    it('Should call getPlanetsByArrayResourcesByFilm with selectedFilm', fakeAsync(() => {
      spyOn(filmsService, 'getPlanetsByArrayResourcesByFilm').and.callThrough();

      component.getPlanetsData(selectedFilm);

      tick(10);

      expect(filmsService.getPlanetsByArrayResourcesByFilm).toHaveBeenCalled();
      expect(filmsService.getPlanetsByArrayResourcesByFilm).toHaveBeenCalledWith(selectedFilm);
    }));

    it('Should fill component.planets with getPlanetsByArrayResourcesByFilm result', fakeAsync(() => {
      const planetsResult = filmsData.planets.map(planet => new Planet(planet));
      spyOn(filmsService, 'getPlanetsByArrayResourcesByFilm')
        .and.returnValue(of(planetsResult));

      component.getPlanetsData(selectedFilm);

      tick(10);

      expect(component.planets).toEqual(planetsResult);
    }));
  });
});
