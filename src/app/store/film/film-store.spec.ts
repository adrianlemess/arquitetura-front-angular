import { Film } from './../../films/models';
import { take } from 'rxjs/operators';
import { filmsData } from './../../services/mocks/film.mock';
import * as fromApp from '../index';
import { TestBed } from '@angular/core/testing';
import { StoreModule, ActionReducerMap, Store } from '@ngrx/store';
import * as fromFilmActions from './film.actions';

const noopMetaReducer = (r: Function) => (state: any, action: any) => {
  return r(state, action);
};
describe('Store Films', () => {
  let store: Store<fromApp.AppState>;
  const filmsMock = filmsData.films.map(film => new Film(film));
  const reducerMap: ActionReducerMap<any> = { film: fromApp.fromFilmReducer.filmReducer };
  const initialState = fromApp.fromFilmReducer.INITIAL_STATE;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducerMap, { initialState, metaReducers: [noopMetaReducer] }),
      ],
    });
    store = TestBed.get(Store);
  });

  describe('CategoriaReducer', () => {

    it('Deve retornar o state default', () => {
      store.pipe(take(1)).subscribe((s: any) => {
        expect(s.film).toEqual(initialState);
      });
    });

    it('Validação do reducer SET_FILMS', () => {
      const action = new fromFilmActions.SetFilms(filmsMock);
      const stateFilm = fromApp.fromFilmReducer.filmReducer(undefined, action);

      expect(stateFilm).not.toBe(initialState);
      expect(stateFilm.films).toEqual(filmsMock);

    });

    it('Validação do reducer SET_SELECTED_FILM', () => {
      const selectedFilm = filmsMock[0];
      const actionPreencherselectedFilm = new fromApp.fromFilmActions.SetSelectedFilm(selectedFilm);
      const stateFilm = fromApp.fromFilmReducer.filmReducer(undefined, actionPreencherselectedFilm);
      expect(stateFilm).not.toBe(initialState);
      expect(stateFilm.selectedFilm).toBe(selectedFilm);
    });

    it('Validação do reducer SET_FIELD_FILM', () => {
      const characters = filmsMock[0].characters;
      const action = new fromApp.fromFilmActions.SetFieldFilm({
        index: 'characters', value: characters
      });
      const state = fromApp.fromFilmReducer.filmReducer(null, action);
      expect(state.characters).not.toEqual(initialState.characters);
      expect(state.characters).toEqual(characters);

    });
  });


  describe('SimulacaoActions', () => {
    it('Validação da Action SET_SELECTED_FILM', () => {
      const film = filmsMock[0];

      const instance = new fromFilmActions.SetSelectedFilm(film);
      expect(instance.type).toEqual(fromFilmActions.SET_SELECTED_FILM);
    });

    it('Validação da Action SET_FILMS', () => {
      const instance = new fromFilmActions.SetFilms(filmsMock);
      expect(instance.type).toEqual(fromFilmActions.SET_FILMS);
    });

    it('Validacao da Action SET_FIELD_FILM', () => {
      const instance = new fromFilmActions.SetFieldFilm({
        index: 'characters', value: filmsMock[0].characters
      });
      expect(instance.type).toEqual(fromFilmActions.SET_FIELD_FILM);
    });
  });
});
