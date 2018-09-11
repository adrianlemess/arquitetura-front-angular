import { Character } from './../models/character';
import { FilmsService } from './../../services/films.service';
import { StateName, fromFilmActions } from './../../store/index';
import { Film } from './../models/films';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  public selectedFilm: Film;
  public characters: Character[];

  constructor(
    private store: Store<AppState>,
    private filmeService: FilmsService
  ) { }

  ngOnInit() {
    this.subscribeStoreFilm();
  }

  public subscribeStoreFilm() {
    this.store.select(StateName.FILMS)
      .subscribe(state => {
        if (state.selectedFilm && state.selectedFilm !== this.selectedFilm) {
          this.selectedFilm = state.selectedFilm;
          this.getCharactersData(state.selectedFilm);
        }
      });
  }

  getCharactersData(selectedFilm) {
    this.setLoading(true);
    this.filmeService.getCharactersByArrayResourcesByFilm(selectedFilm)
      .subscribe((characters: Character[]) => {
        this.setLoading(false);
        this.characters = characters;
      }, () => {
        this.setLoading(false);
      });
  }

  public setLoading(flag) {
    this.store.dispatch(new fromFilmActions.SetFieldFilm({
        index: 'loadingData', value: flag
      })
    );
  }
}
