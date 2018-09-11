import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromFilmActions from './film/film.actions';
import * as fromFilmReducer from './film/film.reducer';

export interface AppState {
  films: fromFilmReducer.State;
}

/* istanbul ignore next */
export const reducers: ActionReducerMap<AppState> = {
  films: fromFilmReducer.filmReducer,
};

/* istanbul ignore next */
export function getInitialState() {
  return { /* istanbul ignore next */
    films: fromFilmReducer.INITIAL_STATE,
  } as AppState; /* istanbul ignore next */
} /* istanbul ignore next */

export enum StateName {
  FILMS = 'films'
}

/* istanbul ignore next */
export const metaReducers: MetaReducer<AppState>[] = [];

export {
  fromFilmReducer,
  fromFilmActions,
};

