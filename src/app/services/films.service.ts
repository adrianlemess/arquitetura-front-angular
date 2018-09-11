import { IStarship, Planet, Character, Film, IFilm, IPlanet, ICharacter, ResponseHttpApi, Starship} from './../films/models';
import { HttpBaseService } from './http-base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmsService extends HttpBaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'films');
   }

  getFilms(): Observable<Film[]> {
    return this.getAll<IFilm>()
      .pipe(
        map(
        (response: ResponseHttpApi<IFilm>) => {
          return response.results.map(film => new Film(film));
        }
      ));
  }

  getFilmById(id: number): Observable<Film> {
    return this.getSingle<IFilm>(id)
      .pipe(
        map((film: IFilm) => new Film(film))
      );
  }

  getCharactersByArrayResourcesByFilm(selectedFilm: Film): Observable<Character[]> {
    return this.getSubchildArray<ICharacter>(selectedFilm, 'characters')
      .pipe(map((characters) => characters.map(character => new Character(character))));
  }

  getStarshipsByArrayResourcesByFilm(selectedFilm: Film) {
    return this.getSubchildArray<IStarship>(selectedFilm, 'starships')
    .pipe(map((starships) => starships.map(starship => new Starship(starship))));
  }

  getPlanetsByArrayResourcesByFilm(selectedFilm: Film) {
    return this.getSubchildArray<IPlanet>(selectedFilm, 'planets')
      .pipe(map((planets) => planets.map(planet => new Planet(planet))));
  }
}
