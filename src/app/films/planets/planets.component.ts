import { FilmsService } from './../../services/films.service';
import { AppState, StateName } from './../../store/index';
import { Film } from './../models/films';
import { Planet } from './../models/planets';
import { Component, OnInit } from '@angular/core';
import { fromFilmActions } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  public selectedFilm: Film;
  public planets: Planet[];

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
          this.getPlanetsData(state.selectedFilm);
        }
      });
  }

  getPlanetsData(selectedFilm) {
    this.setLoading(true);
    this.filmeService.getPlanetsByArrayResourcesByFilm(selectedFilm)
      .subscribe((planets: Planet[]) => {
        this.setLoading(false);
        this.planets = planets;
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
