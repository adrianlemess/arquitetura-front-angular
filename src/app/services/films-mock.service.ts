import { Starship } from './../films/models/starship';
import { Planet } from './../films/models/planets';
import { Character } from './../films/models/character';
import { Film } from './../films/models';
import { filmsData } from './mocks/film.mock';
import { of, Observable } from 'rxjs';

export class FilmsMockService {

  getFilms(): Observable<Film[]> {
    const films = filmsData.films.map((film) => new Film(film));
    return of(films);
  }

  getCharactersByArrayResourcesByFilm(selectedFilm: Film): Observable<Character[]> {
    const characters = filmsData.characters.map((character) => new Character(character));
    return of(characters);
  }

  getPlanetsByArrayResourcesByFilm(selectedFilm: Film): Observable<Planet[]> {
    const planets = filmsData.planets.map((planet) => new Planet(planet));
    return of(planets);
  }

  getStarshipsByArrayResourcesByFilm(selectedFilm: Film): Observable<Starship[]> {
    const starships = filmsData.starships.map((starship) => new Starship(starship));
    return of(starships);
  }

}
