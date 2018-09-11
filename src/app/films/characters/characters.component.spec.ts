import { Character } from './../models/character';
import { Film } from './../models/films';
import { filmsData } from './../../services/mocks/film.mock';
import { StateName, fromFilmActions } from './../../store/index';
import { FilmsService } from './../../services/films.service';
import { Store } from '@ngrx/store';
import { FilmTestingModule } from './../../testing/modules/film-testing.module';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CharactersComponent } from './characters.component';
import { AppState } from '../../store';
import { of, throwError } from 'rxjs';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let store: Store<AppState>;
  let filmsService: FilmsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FilmTestingModule
      ],
      declarations: [ CharactersComponent ]
    })
    .compileComponents()
      .then(() => {
        store = TestBed.get(Store);
        filmsService = TestBed.get(FilmsService);
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
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
      spyOn(component, 'getCharactersData');
      const selectedFilm = new Film(filmsData.films[0]);
      store.dispatch(new fromFilmActions.SetSelectedFilm(selectedFilm));
      component.subscribeStoreFilm();
      tick(10);
      expect(component.selectedFilm).toEqual(selectedFilm);
    }));


    it('Should call getCharactersData() with selectedFilm', fakeAsync(() => {
      const selectedFilm = new Film(filmsData.films[0]);
      spyOn(component, 'getCharactersData');
      store.dispatch(new fromFilmActions.SetSelectedFilm(selectedFilm));
      component.subscribeStoreFilm();
      tick(10);
      expect(component.getCharactersData).toHaveBeenCalled();
      expect(component.getCharactersData).toHaveBeenCalledWith(selectedFilm);

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


  describe('getCharactersData()', () => {
    const selectedFilm = new Film(filmsData.films[0]);
    it('Should call setLoading twice', fakeAsync(() => {
      spyOn(component, 'setLoading');

      component.getCharactersData(selectedFilm);

      tick(10);

      expect(component.setLoading).toHaveBeenCalled();
      expect(component.setLoading).toHaveBeenCalledWith(true);
      expect(component.setLoading).toHaveBeenCalledWith(false);
    }));

    it('Should call setLoading twice even with error', fakeAsync(() => {
      spyOn(component, 'setLoading');
      spyOn(filmsService, 'getCharactersByArrayResourcesByFilm')
        .and.returnValue(throwError('erro'));

      component.getCharactersData(selectedFilm);

      tick(10);

      expect(component.setLoading).toHaveBeenCalled();
      expect(component.setLoading).toHaveBeenCalledWith(true);
      expect(component.setLoading).toHaveBeenCalledWith(false);
    }));

    it('Should call getCharactersByArrayResourcesByFilm with selectedFilm', fakeAsync(() => {
      spyOn(filmsService, 'getCharactersByArrayResourcesByFilm').and.callThrough();

      component.getCharactersData(selectedFilm);

      tick(10);

      expect(filmsService.getCharactersByArrayResourcesByFilm).toHaveBeenCalled();
      expect(filmsService.getCharactersByArrayResourcesByFilm).toHaveBeenCalledWith(selectedFilm);
    }));

    it('Should fill component.characters with getCharactersByArrayResourcesByFilm result', fakeAsync(() => {
      const charactersResult = filmsData.characters.map(character => new Character(character));
      spyOn(filmsService, 'getCharactersByArrayResourcesByFilm')
        .and.returnValue(of(charactersResult));

      component.getCharactersData(selectedFilm);

      tick(10);

      expect(component.characters).toEqual(charactersResult);
    }));
  });
});
