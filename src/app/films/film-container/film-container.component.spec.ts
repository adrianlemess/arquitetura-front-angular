import { StoreFilmMockService } from '../services/store-film-mock.service';
import { StoreFilmService } from './../services/store-film.service';
import { INITIAL_STATE as InitialStateFilm, filmReducer } from './../../store/film/film.reducer';
import { StoreModule } from '@ngrx/store';
import { Film } from '../models';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FilmContainerComponent } from './film-container.component';
import { throwError } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

describe('FilmContainerComponent', () => {
  let component: FilmContainerComponent;
  let fixture: ComponentFixture<FilmContainerComponent>;
  let storeFilmService: StoreFilmService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ films: filmReducer },
          {
            initialState: {
              films: InitialStateFilm
            }
          }),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: {
              subscribe: (fn: (value: Params) => void) => fn({
                  idFilm: 15,
              }),
            }
          },
        },
        { provide: StoreFilmService, useClass: StoreFilmMockService }
      ],
      declarations: [ FilmContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmContainerComponent);
    component = fixture.componentInstance;
    storeFilmService = TestBed.get(StoreFilmService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Model Film', () => {
    it('Should return nomeCompleto with episodeId in roman', () => {
      const film = new Film({
        title: 'The Phantom Menace',
        episode_id: 1,
        created: '1999-05-19',
        producer: 'Lucas Film',
        director: 'George Lucas',
        opening_crawl: 'In a galaxy far far away, this is the worst movie',
        release_date: '1999-05-19'
      });

      expect(film.CompleteName).toContain('Episode I - The Phantom Menace');

      film.episodeId = 2;
      expect(film.CompleteName).toContain('Episode II - The Phantom Menace');

      film.episodeId = 3;
      expect(film.CompleteName).toContain('Episode III - The Phantom Menace');

      film.episodeId = 4;
      expect(film.CompleteName).toContain('Episode IV - The Phantom Menace');

      film.episodeId = 5;
      expect(film.CompleteName).toContain('Episode V - The Phantom Menace');

      film.episodeId = 6;
      expect(film.CompleteName).toContain('Episode VI - The Phantom Menace');

      film.episodeId = 7;
      expect(film.CompleteName).toContain('Episode VII - The Phantom Menace');

      film.episodeId = 8;
      expect(film.CompleteName).toContain('Episode VIII - The Phantom Menace');

      film.episodeId = 9;
      expect(film.CompleteName).toContain('Episode IX - The Phantom Menace');

      film.episodeId = 10;
      expect(film.CompleteName).toContain('Episode X - The Phantom Menace');

      film.episodeId = 999;
      expect(film.CompleteName).toContain('Episode 999 - The Phantom Menace');

    });
  });

  describe('setFilmDataById()', () => {
    it('Should call setLoading', fakeAsync(() => {
      const idFilm = 15;
      spyOn(component, 'setLoading');
      component.setFilmDataById(idFilm);
      tick(10);
      expect(component.setLoading).toHaveBeenCalledTimes(2);
      expect(component.setLoading).toHaveBeenCalledWith(true);
      expect(component.setLoading).toHaveBeenCalledWith(false);
    }));

    it('Should call setLoading false even with an erro', fakeAsync(() => {
      const idFilm = 15;
      spyOn(storeFilmService, 'fillStateWithFilmSelected').and.returnValue(throwError('erro'));
      spyOn(component, 'setLoading');
      component.setFilmDataById(idFilm);
      tick(10);
      expect(component.setLoading).toHaveBeenCalledTimes(2);
      expect(component.setLoading).toHaveBeenCalledWith(true);
      expect(component.setLoading).toHaveBeenCalledWith(false);
    }));

    it('Should call fillStateWIthFilmSelected()', fakeAsync(() => {
      spyOn(storeFilmService, 'fillStateWithFilmSelected').and.callThrough();
      const idFilm = 15;
      component.setFilmDataById(idFilm);
      tick(10);

      expect(storeFilmService.fillStateWithFilmSelected).toHaveBeenCalled();
      expect(storeFilmService.fillStateWithFilmSelected).toHaveBeenCalledWith(idFilm);
    }));
  });

  it('subscribeRoute() - Should call setFilmDataById passing the idFilm param from ActivatedRoute mock value', fakeAsync(() => {
    spyOn(component, 'setFilmDataById');
    component.subscribeRoute();
    tick(10);

    expect(component.setFilmDataById).toHaveBeenCalled();
    expect(component.setFilmDataById).toHaveBeenCalledWith(15);

  }));
});
