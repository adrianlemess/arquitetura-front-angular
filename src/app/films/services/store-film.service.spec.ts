import { Film } from './../models/films';
import { filmsData } from './../../services/mocks/film.mock';
import { StoreModule, Store } from '@ngrx/store';
import { TestBed, async } from '@angular/core/testing';

import { StoreFilmService } from './store-film.service';
import { filmReducer, INITIAL_STATE as InitialStateFilm } from '../../store/film/film.reducer';
import { FilmsService } from '../../services/films.service';
import { FilmsMockService } from '../../services/films-mock.service';
import { AppState, fromFilmActions } from '../../store';
import { of } from 'rxjs';

describe('StoreFilmService', () => {
  let service: StoreFilmService;
  let store: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ films: filmReducer },
          {
            initialState: {
              films: InitialStateFilm
            }
          }),
      ],
      providers: [
        StoreFilmService,
        { provide: FilmsService, useClass: FilmsMockService}
      ],
    });

    service = TestBed.get(StoreFilmService);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('getFilmsStore() - Should return films from store', async(() => {
    const films = filmsData.films.map(film => new Film(film));
    store.dispatch(new fromFilmActions.SetFilms(films));

    service.getFilmsStore()
      .subscribe((resultado) => {
        expect(resultado).toEqual(films);
      });
  }));

  it('fillStateWithFilmSelected() - Should dispatch an action with the selectedFilm', async(() => {
    const films = filmsData.films.map(film => new Film(film));
    const filmId = filmsData.films[0].episode_id;
    spyOn(service, 'getFilmsStore').and.returnValue(of(films));
    spyOn(store, 'dispatch');
    service.fillStateWithFilmSelected(filmId)
      .subscribe(() => {
        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(new fromFilmActions.SetSelectedFilm(films[0]));
      });
  }));
});
