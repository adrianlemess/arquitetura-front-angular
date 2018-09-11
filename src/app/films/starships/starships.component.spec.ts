import { Starship } from './../models/starship';
import { of, throwError } from 'rxjs';
import { Film } from './../models/films';
import { StateName, fromFilmActions } from './../../store/index';
import { filmsData } from './../../services/mocks/film.mock';
import { StarshipsComponent } from './starships.component';
import { FilmsService } from './../../services/films.service';
import { Store } from '@ngrx/store';
import { FilmTestingModule } from './../../testing/modules/film-testing.module';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { AppState } from '../../store';

describe('StarshipsComponent', () => {
  let component: StarshipsComponent;
  let fixture: ComponentFixture<StarshipsComponent>;
  let store: Store<AppState>;
  let filmsService: FilmsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FilmTestingModule
      ],
      declarations: [ StarshipsComponent ]
    })
    .compileComponents()
      .then(() => {
        store = TestBed.get(Store);
        filmsService = TestBed.get(FilmsService);
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipsComponent);
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
      spyOn(component, 'getStarshipData');
      const selectedFilm = new Film(filmsData.films[0]);
      store.dispatch(new fromFilmActions.SetSelectedFilm(selectedFilm));
      component.subscribeStoreFilm();
      tick(10);
      expect(component.selectedFilm).toEqual(selectedFilm);
    }));

    it('Should call getStarshipData() with selectedFilm', fakeAsync(() => {
      const selectedFilm = new Film(filmsData.films[0]);
      spyOn(component, 'getStarshipData');
      store.dispatch(new fromFilmActions.SetSelectedFilm(selectedFilm));
      component.subscribeStoreFilm();
      tick(10);
      expect(component.getStarshipData).toHaveBeenCalled();
      expect(component.getStarshipData).toHaveBeenCalledWith(selectedFilm);

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


  describe('getStarshipData()', () => {
    const selectedFilm = new Film(filmsData.films[0]);
    it('Should call setLoading twice', fakeAsync(() => {
      spyOn(component, 'setLoading');

      component.getStarshipData(selectedFilm);

      tick(10);

      expect(component.setLoading).toHaveBeenCalled();
      expect(component.setLoading).toHaveBeenCalledWith(true);
      expect(component.setLoading).toHaveBeenCalledWith(false);
    }));

    it('Should call setLoading twice even with error', fakeAsync(() => {
      spyOn(component, 'setLoading');
      spyOn(filmsService, 'getStarshipsByArrayResourcesByFilm')
        .and.returnValue(throwError('erro'));

      component.getStarshipData(selectedFilm);

      tick(10);

      expect(component.setLoading).toHaveBeenCalled();
      expect(component.setLoading).toHaveBeenCalledWith(true);
      expect(component.setLoading).toHaveBeenCalledWith(false);
    }));

    it('Should call getStarshipsByArrayResourcesByFilm with selectedFilm', fakeAsync(() => {
      spyOn(filmsService, 'getStarshipsByArrayResourcesByFilm').and.callThrough();

      component.getStarshipData(selectedFilm);

      tick(10);

      expect(filmsService.getStarshipsByArrayResourcesByFilm).toHaveBeenCalled();
      expect(filmsService.getStarshipsByArrayResourcesByFilm).toHaveBeenCalledWith(selectedFilm);
    }));

    it('Should fill component.starships with getStarshipsByArrayResourcesByFilm result', fakeAsync(() => {
      const starshipsResult = filmsData.starships.map(starship => new Starship(starship));
      spyOn(filmsService, 'getStarshipsByArrayResourcesByFilm')
        .and.returnValue(of(starshipsResult));

      component.getStarshipData(selectedFilm);

      tick(10);

      expect(component.starships).toEqual(starshipsResult);
    }));
  });
});
