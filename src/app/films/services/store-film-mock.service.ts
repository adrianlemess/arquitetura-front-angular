import { filmsData } from '../../services/mocks/film.mock';
import { Observable, of } from 'rxjs';
import { IFilm } from '../models/films';
import { AppState, fromFilmActions } from '../../store';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class StoreFilmMockService {

  constructor(private store: Store<AppState>) { }

  public getFilmsStore(): Observable<IFilm[]> {
    return of(filmsData.films);
  }

  public fillStateWithFilmSelected(idFilm): Observable<any> {
    return of('fillStateWithFilmSelected');
  }

  fillStateWithFilmAtributtes(selectedFilm) {
    console.log('fillStateWithFilmAtributtes');
  }

}
