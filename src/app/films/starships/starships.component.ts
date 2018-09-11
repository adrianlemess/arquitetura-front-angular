import { FilmsService } from './../../services/films.service';
import { Store } from '@ngrx/store';
import { AppState, StateName, fromFilmActions } from './../../store/index';
import { Starship } from './../models/starship';
import { Film } from './../models/films';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss']
})
export class StarshipsComponent implements OnInit {
  public selectedFilm: Film;
  public starships: Starship[];

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
          this.getStarshipData(state.selectedFilm);
        }
      });
  }

  getStarshipData(selectedFilm) {
    this.setLoading(true);
    this.filmeService.getStarshipsByArrayResourcesByFilm(selectedFilm)
      .subscribe((starships: Starship[]) => {
        this.starships = starships;
        this.setLoading(false);
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
