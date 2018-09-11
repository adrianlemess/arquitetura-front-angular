import { FilmsService } from './../../services/films.service';
import { Observable, of, forkJoin } from 'rxjs';
import { Film } from './../models/films';
import { AppState, StateName, fromFilmActions } from './../../store/index';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, switchMap, tap, concatMap } from 'rxjs/operators';

@Injectable()
export class StoreFilmService {

  constructor(
    private store: Store<AppState>
  ) { }

  /**
   * Should get an films array from Store 'films'
   * @return Observable<Array<Film>>
   */
  public getFilmsStore(): Observable<Film[]> {
    return this.store.select(StateName.FILMS)
    .pipe(
      map((state) => {
        return state.films;
      }));
    }

    public fillStateWithFilmSelected(idFilm) {
      return this.getFilmsStore()
      .pipe(
          tap((films) => {
            const selectedFilm = films.filter(film => Number(film.episodeId) === Number(idFilm))[0];
            this.store.dispatch(new fromFilmActions.SetSelectedFilm(selectedFilm));
          })
        );
      }
    }
