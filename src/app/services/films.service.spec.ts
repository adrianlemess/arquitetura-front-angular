import { Character } from './../films/models/character';
import { IFilm } from './../films/models/films';
import { ResponseHttpApi } from './../films/models/response';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject, async } from '@angular/core/testing';
import { of } from 'rxjs';
import { filmsData } from './mocks/film.mock';
import { Film, Starship, Planet } from '../films/models';
import { FilmsService } from './films.service';

describe('FilmsService', () => {
  let filmService: FilmsService;
  let filmServiceSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [FilmsService]
    });

    filmService = TestBed.get(FilmsService);
    filmServiceSpy = spyOn(filmService, 'getSubchildArray').and.returnValue(of('ok'));
  });

  it('should be created', inject([FilmsService], (service: FilmsService) => {
    expect(service).toBeTruthy();
  }));

  it('getFilms() -> Should call getAll()', async(() => {
    const response: ResponseHttpApi<IFilm> = {
      next: null,
      previous: null,
      count: 7,
      results: filmsData.films
    };

    spyOn(filmService, 'getAll').and.returnValue(of(response));


    filmService.getFilms()
    .subscribe((films) => {
      expect(filmService.getAll).toHaveBeenCalled();
      expect(films.length).toEqual(response.results.length);

      // Check if all films are a instance of Film
      expect(films.every(film => film instanceof Film)).toBeTruthy();
    });
  }));

  it('getFilmById() -> Should call getSingle()', async(() => {
    const filmResponse = filmsData.films[0];
    const id = filmsData.films[0].episode_id;

    spyOn(filmService, 'getSingle').and.returnValue(of(filmResponse));

    filmService.getFilmById(id)
    .subscribe((film) => {
      expect(filmService.getSingle).toHaveBeenCalled();
      expect(filmService.getSingle).toHaveBeenCalledWith(id);

      // Check if the result is a film instace
      expect(film instanceof Film).toBeTruthy();
    });
  }));

  it('getCharactersByArrayResourcesByFilm() - Should call getShubchildArray with the'
  + 'selectedFilm and the \'character\' string', () => {
    const filmSelected = new Film(filmsData.films[0]);
    filmService.getCharactersByArrayResourcesByFilm(filmSelected);

    expect(filmService.getSubchildArray).toHaveBeenCalled();
    expect(filmService.getSubchildArray).toHaveBeenCalledWith(filmSelected, 'characters');

  });

  it('getCharactersByArrayResourcesByFilm() - Should return instances of characters from getShubchildArray with the'
  + 'selectedFilm and the \'character\' string', async(() => {
    filmServiceSpy.and.returnValue(of(filmsData.characters));
    const filmSelected = new Film(filmsData.films[0]);
    filmService.getCharactersByArrayResourcesByFilm(filmSelected)
      .subscribe(charactersResult => {
        expect(filmService.getSubchildArray).toHaveBeenCalled();
        expect(filmService.getSubchildArray).toHaveBeenCalledWith(filmSelected, 'characters');
        expect(charactersResult).toEqual(filmsData.characters.map(character => new Character(character)));
      });
  }));

  it('getStarshipsByArrayResourcesByFilm() - Should call getShubchildArray with the'
  + 'selectedFilm and the \'starships\' string', () => {
    const filmSelected = new Film(filmsData.films[0]);
    filmService.getStarshipsByArrayResourcesByFilm(filmSelected);

    expect(filmService.getSubchildArray).toHaveBeenCalled();
    expect(filmService.getSubchildArray).toHaveBeenCalledWith(filmSelected, 'starships');
  });

  it('getStarshipsByArrayResourcesByFilm() - Should return instances of starships from getShubchildArray with the'
  + 'selectedFilm and the \'starships\' string', async(() => {
    filmServiceSpy.and.returnValue(of(filmsData.starships));
    const filmSelected = new Film(filmsData.films[0]);
    filmService.getStarshipsByArrayResourcesByFilm(filmSelected)
      .subscribe(starshipsResult => {
        expect(filmService.getSubchildArray).toHaveBeenCalled();
        expect(filmService.getSubchildArray).toHaveBeenCalledWith(filmSelected, 'starships');
        expect(starshipsResult).toEqual(filmsData.starships.map(starship => new Starship(starship)));
      });
  }));

  it('getPlanetsByArrayResourcesByFilm() - Should call getShubchildArray with the'
  + 'selectedFilm and the \'planets\' string', () => {

    const filmSelected = new Film(filmsData.films[0]);
    filmService.getPlanetsByArrayResourcesByFilm(filmSelected);

    expect(filmService.getSubchildArray).toHaveBeenCalled();
    expect(filmService.getSubchildArray).toHaveBeenCalledWith(filmSelected, 'planets');
  });

  it('getPlanetsByArrayResourcesByFilm() - Should return instances of planets from getShubchildArray with the'
  + 'selectedFilm and the \'planets\' string', async(() => {
    filmServiceSpy.and.returnValue(of(filmsData.planets));
    const filmSelected = new Film(filmsData.films[0]);
   filmService.getPlanetsByArrayResourcesByFilm(filmSelected)
      .subscribe(planetsResult => {
        expect(filmService.getSubchildArray).toHaveBeenCalled();
        expect(filmService.getSubchildArray).toHaveBeenCalledWith(filmSelected, 'planets');
        expect(planetsResult).toEqual(filmsData.planets.map(planet => new Planet(planet)));
      });

  }));

  afterEach(inject([HttpTestingController], (httpClient: HttpTestingController) => {
    httpClient.verify();
  }));
});
