import { Film } from './../../films/models/films';
import * as fromFilmAction from './film.actions';

export interface State {
  films: Film[];
  selectedFilm: Film;
  characters: any;
  planets: any;
  starships: any;
  loadingData: boolean;
}

export const INITIAL_STATE: State = {
  films: [],
  selectedFilm: null,
  characters: [],
  planets: [],
  starships: [],
  loadingData: false
};

export function filmReducer(state: any = INITIAL_STATE, action: fromFilmAction.FilmsActions): State {
  switch (action.type) {
    case (fromFilmAction.SET_FIELD_FILM):
      return {
        ...state,
        [action.payload.index]: action.payload.value
      };
    case (fromFilmAction.SET_SELECTED_FILM):
      return {
        ...state,
        selectedFilm: action.payload
      };
    case (fromFilmAction.SET_FILMS):
      return {
        ...state,
        films: [...action.payload]
      };
    default:
      return state;
  }
}
