import { StoreModule } from '@ngrx/store';
import { SharedModule } from './../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { filmReducer, INITIAL_STATE as InitialStateFilm } from '../../store/film/film.reducer';
import { FilmsService } from '../../services/films.service';
import { FilmsMockService } from '../../services/films-mock.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterTestingModule,
    StoreModule.forRoot({ films: filmReducer },
      {
        initialState: {
          films: InitialStateFilm
        }
      }),
  ],
  providers: [
    { provide: FilmsService, useClass: FilmsMockService}
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],

  exports: [
    StoreModule,
    RouterTestingModule,
    SharedModule
  ],
})

export class FilmTestingModule { }
