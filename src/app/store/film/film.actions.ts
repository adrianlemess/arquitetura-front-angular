import { Film } from './../../films/models/films';
import { Action } from '@ngrx/store';

export const SET_FILMS = 'SET_FILMS';
export const SET_SELECTED_FILM = 'SET_SELECTED_FILM';
export const SET_FIELD_FILM = 'SET_FIELD_FILM';

export class SetFilms implements Action {
  readonly type = SET_FILMS;
  constructor(public payload: Film[]) { }
}

export class SetSelectedFilm implements Action {
  readonly type = SET_SELECTED_FILM;
  constructor(public payload: Film) {}
}

export class SetFieldFilm implements Action {
  readonly type = SET_FIELD_FILM;
  constructor(public payload: { index: string, value: any }) {}
}

export type FilmsActions =
  SetFilms |
  SetSelectedFilm |
  SetFieldFilm;
